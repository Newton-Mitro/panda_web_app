<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Testimonial;
use App\Infrastructure\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $testimonials = Testimonial::with('media')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('testimonials/index', [
            'testimonials' => $testimonials,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();

        return Inertia::render('testimonials/create', [
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'author_name' => 'required|string|max:255',
            'author_designation' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
            'media_id' => 'nullable|exists:media,id',
            'rating' => 'nullable|integer|min:1|max:5',
            'status' => 'required|in:Active,Inactive',
        ]);

        Testimonial::create($data);

        return redirect()->route('testimonials.index')->with('success', 'Testimonial created.');
    }

    public function show(Testimonial $testimonial)
    {
        return Inertia::render('testimonials/show', [
            'testimonial' => $testimonial->load('media'),
        ]);
    }

    public function edit(Testimonial $testimonial, Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();

        return Inertia::render('testimonials/edit', [
            'testimonial' => $testimonial->load('media'),
            'media' => $media,
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate([
            'author_name' => 'required|string|max:255',
            'author_designation' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
            'media_id' => 'nullable|exists:media,id',
            'rating' => 'nullable|integer|min:1|max:5',
            'status' => 'required|in:Active,Inactive',
        ]);

        $testimonial->update($data);

        return redirect()->route('testimonials.index')->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return redirect()->route('testimonials.index')->with('success', 'Testimonial deleted.');
    }
}
