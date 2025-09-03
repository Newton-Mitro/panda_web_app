<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Project;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $projects = Project::with(['media', 'category'])
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('projects/index', [
            'projects' => $projects,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Project')->get();

        return Inertia::render('projects/create', [
            'media' => $media,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:projects,slug',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'source_code_link' => 'nullable|url',
            'live_site_link' => 'nullable|url',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'gallery' => 'nullable|array',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        $data['slug'] = $request->input('slug') ?: Project::generateUniqueSlug($request->input('title'));
        $data['status'] = 'Active';

        Project::create($data);

        return redirect()->route('projects.index')->with('success', 'Project created.');
    }

    public function show(Project $project)
    {
        // dd($project->load(['media', 'category']));
        return Inertia::render('projects/show', [
            'project' => $project->load(['media', 'category']),
        ]);
    }

    public function edit(Project $project, Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Project')->get();

        return Inertia::render('projects/edit', [
            'project' => $project->load(['media']),
            'media' => $media,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:projects,slug,' . $project->id,
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'source_code_link' => 'nullable|url',
            'live_site_link' => 'nullable|url',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'gallery' => 'nullable|array',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        $project->update($data);

        return redirect()->route('projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index')->with('success', 'Project deleted.');
    }
}
