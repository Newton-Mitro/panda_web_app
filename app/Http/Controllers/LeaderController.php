<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Leader;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);
        $leaders = Leader::with('media', 'category')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('leaders/index', [
            'leaders' => $leaders,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Leader')->get();

        return Inertia::render('leaders/create', [
            'categories' => $categories,
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'message' => 'nullable|string',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:Active,Inactive',
            'facebook_links' => 'nullable|string',
            'twitter_links' => 'nullable|string',
            'linkedin_links' => 'nullable|string',
            'instagram_links' => 'nullable|string',
            'email' => 'nullable|email|unique:leaders,email',
            'phone' => 'nullable|string|unique:leaders,phone',
            'address' => 'nullable|string',
        ]);

        Leader::create($data);

        return redirect()->route('leaders.index')->with('success', 'Leader created.');
    }

    public function show(Leader $leader)
    {
        return Inertia::render('leaders/show', [
            'leader' => $leader->load('media', 'category'),
        ]);
    }

    public function edit(Leader $leader, Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Leader')->get();

        return Inertia::render('leaders/edit', [
            'leader' => $leader->load('media'),
            'categories' => $categories,
            'media' => $media,
        ]);
    }

    public function update(Request $request, Leader $leader)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'message' => 'nullable|string',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:Active,Inactive',
            'facebook_links' => 'nullable|string',
            'twitter_links' => 'nullable|string',
            'linkedin_links' => 'nullable|string',
            'instagram_links' => 'nullable|string',
            'email' => 'nullable|email|unique:leaders,email,' . $leader->id,
            'phone' => 'nullable|string|unique:leaders,phone,' . $leader->id,
            'address' => 'nullable|string',
        ]);

        $leader->update($data);

        return redirect()->route('leaders.index')->with('success', 'Leader updated.');
    }

    public function destroy(Leader $leader)
    {
        $leader->delete();
        return redirect()->route('leaders.index')->with('success', 'Leader deleted.');
    }
}
