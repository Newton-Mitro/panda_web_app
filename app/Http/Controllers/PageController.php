<?php

namespace App\Http\Controllers;

use App\Core\Utils\SlugHelper;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Infrastructure\Models\Page;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\PageSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PageController extends Controller
{
    public function index(): Response
    {
        $pages = Page::latest()->paginate(perPage: 15);

        return Inertia::render('pages/index', [
            'pages' => $pages
        ]);
    }

    public function create(Request $request): Response
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();

        return Inertia::render('pages/create', [
            'media' => $media
        ]);
    }

    public function store(StorePageRequest $request)
    {
        DB::transaction(function () use ($request) {
            $title = $request->input('title');

            $slug = $request->input('slug')
                ?: Page::generateUniqueSlug($title);

            $page = Page::create([
                'title' => $title,
                'slug' => $slug,
                'meta_title' => $request->input('meta_title'),
                'meta_description' => $request->input('meta_description'),
                'parent_id' => $request->input('parent_id'),
            ]);

            foreach ($request->input('sections', []) as $section) {
                $page->sections()->create($section);
            }
        });

        return redirect()->route('pages.index')->with('success', 'Page created successfully.');
    }

    public function show(Page $page): Response
    {
        $sections = PageSection::with('media')
            ->where('page_id', $page->id)
            ->orderBy('sort_order', 'asc')
            ->get();

        return Inertia::render('pages/show', [
            'page' => $page,
            'sections' => $sections,
        ]);
    }

    public function edit(Page $page, Request $request): Response
    {
        $perPage = $request->input('perPage', 10);
        $filter = $request->input('type', 'all');

        $mediaQuery = Media::latest();

        switch ($filter) {
            case 'images':
                $mediaQuery->where('file_type', 'like', 'image/%');
                break;
            case 'videos':
                $mediaQuery->where('file_type', 'like', 'video/%');
                break;
            case 'audio':
                $mediaQuery->where('file_type', 'like', 'audio/%');
                break;
            case 'pdf':
                $mediaQuery->where('file_type', 'application/pdf');
                break;
            case 'docs':
                $mediaQuery->where(function ($q) {
                    $q->where('file_type', 'like', '%word%')
                        ->orWhere('file_type', 'like', '%excel%')
                        ->orWhere('file_type', 'like', '%presentation%')
                        ->orWhere('file_type', 'like', '%powerpoint%');
                });
                break;
            case 'archives':
                $mediaQuery->where(function ($q) {
                    $q->where('file_type', 'like', '%zip%')
                        ->orWhere('file_type', 'like', '%rar%')
                        ->orWhere('file_type', 'like', '%tar%')
                        ->orWhere('file_type', 'like', '%gzip%')
                        ->orWhere('file_type', 'like', '%7z%');
                });
                break;
        }

        $media = $mediaQuery->paginate($perPage)->withQueryString();

        $sections = PageSection::with('media')
            ->where('page_id', $page->id)
            ->orderBy('sort_order', 'asc')
            ->get();

        return Inertia::render('pages/edit', [
            'page' => $page,
            'sections' => $sections,
            'media' => $media,
            'filters' => [
                'type' => $filter,
                'perPage' => $perPage,
            ],
        ]);
    }

    public function update(StorePageRequest $request, Page $page)
    {
        DB::transaction(function () use ($request, $page) {
            $page->update($request->only([
                'title',
                'slug',
                'meta_title',
                'meta_description',
                'parent_id'
            ]));

            $existingIds = $page->sections()->pluck('id')->toArray();
            $incomingIds = collect($request->sections ?? [])->pluck('id')->filter()->toArray();

            // Delete removed sections
            $toDelete = array_diff($existingIds, $incomingIds);
            if (!empty($toDelete)) {
                PageSection::whereIn('id', $toDelete)->delete();
            }

            // Upsert sections
            foreach ($request->sections ?? [] as $section) {
                if (isset($section['id'])) {
                    PageSection::where('id', $section['id'])->update($section);
                } else {
                    $page->sections()->create($section);
                }
            }
        });

        return redirect()->route('pages.index')->with('success', 'Page updated successfully.');
    }

    public function destroy(Page $page): RedirectResponse
    {
        $page->delete();

        return redirect()->route('pages.index')
            ->with('success', 'Page deleted successfully.');
    }
}
