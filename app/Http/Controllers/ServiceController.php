<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Service;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $services = Service::with(['media', 'category'])
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('services/index', [
            'services' => $services,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Service')->get();

        return Inertia::render('services/create', [
            'media' => $media,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'gallery' => 'nullable|array',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        // Get title from request
        $title = $request->input('title');

        // Generate slug (unique)
        $data['slug'] = $request->input('slug') ?: Service::generateUniqueSlug($title);

        // Set default status
        $data['status'] = 'Active';

        Service::create($data);

        return redirect()->route('services.index')->with('success', 'Service created.');
    }


    public function show(Service $service)
    {
        return Inertia::render('services/show', [
            'service' => $service->load(['media', 'category']),
        ]);
    }

    public function edit(Service $service, Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Service')->get();

        return Inertia::render('services/edit', [
            'service' => $service->load(['media']),
            'media' => $media,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:services,slug,' . $service->id,
            'description' => 'nullable|string',
            'gallery' => 'nullable|array',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        $service->update($data);

        return redirect()->route('services.index')->with('success', 'Service updated.');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->route('services.index')->with('success', 'Service deleted.');
    }
}
