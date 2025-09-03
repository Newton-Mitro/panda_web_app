<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Notice;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoticeController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $notices = Notice::with(['media', 'category'])
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('notices/index', [
            'notices' => $notices,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Notice')->get();

        return Inertia::render('notices/create', [
            'media' => $media,
            'categories' => $categories,
        ]);

    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:notices,slug',
            'content' => 'nullable|string',
            'publish_date' => 'required|date',
            'expiry_date' => 'nullable|date|after_or_equal:publish_date',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'nullable|exists:categories,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        $title = $request->input('title');
        $data['slug'] = $request->input('slug') ?: Notice::generateUniqueSlug($title);
        $data['status'] = 'Active';

        Notice::create($data);

        return redirect()->route('notices.index')->with('success', 'Notice created.');
    }

    public function show(Notice $notice)
    {
        return Inertia::render('notices/show', [
            'notice' => $notice->load(['media', 'category']),
        ]);
    }

    public function edit(Notice $notice, Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Notice')->get();

        return Inertia::render('notices/edit', [
            'notice' => $notice->load(['media']),
            'media' => $media,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Notice $notice)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:notices,slug,' . $notice->id,
            'content' => 'nullable|string',
            'publish_date' => 'required|date',
            'expiry_date' => 'nullable|date|after_or_equal:publish_date',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'nullable|exists:categories,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        $notice->update($data);

        return redirect()->route('notices.index')->with('success', 'Notice updated.');
    }

    public function destroy(Notice $notice)
    {
        $notice->delete();
        return redirect()->route('notices.index')->with('success', 'Notice deleted.');
    }
}
