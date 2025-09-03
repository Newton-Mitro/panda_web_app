<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGalleryRequest;
use App\Http\Requests\UpdateGalleryRequest;
use App\Infrastructure\Models\Gallery;
use App\Infrastructure\Models\GalleryMedia;
use App\Infrastructure\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::with('media')->latest()->paginate(20);
        return Inertia::render('galleries/index', [
            'galleries' => $galleries,
        ]);
    }

    public function create(Request $request): Response
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();

        return Inertia::render('galleries/create', [
            'media' => $media
        ]);
    }

    public function store(StoreGalleryRequest $request)
    {
        // dd($request->all());
        DB::transaction(function () use ($request) {
            $gallery = Gallery::create([
                'title' => $request->title,
                'description' => $request->description,
                'media_id' => $request->media_id,
            ]);

            foreach ($request->input('media_items', []) as $item) {
                $gallery->mediaItems()->create([
                    'media_id' => $item['media_id'],
                    'caption' => $item['caption'] ?? null,
                    'description' => $item['description'] ?? null,
                ]);
            }
        });

        return redirect()->route('galleries.index')->with('success', 'Gallery created successfully.');
    }

    public function show(Gallery $gallery): Response
    {
        $gallery->load('media', 'mediaItems.media');

        return Inertia::render('galleries/show', [
            'gallery' => $gallery
        ]);
    }

    public function edit(Gallery $gallery, Request $request): Response
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();

        $gallery->load('media', 'mediaItems.media');


        return Inertia::render('galleries/edit', [
            'gallery' => $gallery,
            'media' => $media,
            'filters' => [
                'perPage' => $perPage,
            ],
        ]);
    }

    public function update(UpdateGalleryRequest $request, Gallery $gallery)
    {
        DB::transaction(function () use ($request, $gallery) {
            $gallery->update($request->only(['title', 'description', 'media_id']));

            $existingIds = $gallery->mediaItems()->pluck('id')->toArray();
            $incomingIds = collect($request->input('media_items', []))->pluck('id')->filter()->toArray();

            // Delete removed items
            $toDelete = array_diff($existingIds, $incomingIds);
            if (!empty($toDelete)) {
                GalleryMedia::whereIn('id', $toDelete)->delete();
            }

            // Upsert items
            foreach ($request->input('media_items', []) as $item) {
                $data = collect($item)->only(['id', 'media_id', 'caption', 'description'])->toArray();

                if (isset($item['id'])) {
                    GalleryMedia::where('id', $item['id'])->update($data);
                } else {
                    $gallery->mediaItems()->create($data);
                }
            }
        });

        return redirect()->route('galleries.index')->with('success', 'Gallery updated successfully.');
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        $gallery->delete();

        return redirect()->route('galleries.index')->with('success', 'Gallery deleted successfully.');
    }
}
