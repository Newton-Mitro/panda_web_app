<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Instructor;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstructorController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $instructors = Instructor::with('media')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('instructors/index', [
            'instructors' => $instructors,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Instructor')->get();

        return Inertia::render('instructors/create', [
            'categories' => $categories,
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'instructor_id' => 'required|string|max:20|unique:instructors,instructor_id',
            'bio' => 'nullable|string|max:100',
            'email' => 'nullable|email|unique:instructors,email',
            'phone' => 'nullable|string|max:15|unique:instructors,phone',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:MALE,FEMALE,OTHER',
            'designation' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'national_id_no' => 'nullable|string|max:20',
            'religion' => 'nullable|in:ISLAM,HINDUISM,CHRISTIANITY,BUDDHISM,OTHER',
            'address' => 'nullable|string',
            'status' => 'required|in:Active,Inactive',
            'media_id' => 'nullable|exists:media,id',
        ]);

        Instructor::create($data);

        return redirect()->route('instructors.index')->with('success', 'Instructor created successfully.');
    }

    public function show(Instructor $instructor)
    {
        return Inertia::render('instructors/show', [
            'instructor' => $instructor->load('media'),
        ]);
    }

    public function edit(Instructor $instructor, Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Instructor')->get();

        return Inertia::render('instructors/edit', [
            'instructor' => $instructor->load('media'),
            'categories' => $categories,
            'media' => $media,
        ]);
    }

    public function update(Request $request, Instructor $instructor)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'instructor_id' => "required|string|max:20|unique:instructors,instructor_id,{$instructor->id}",
            'bio' => 'nullable|string|max:100',
            'email' => "nullable|email|unique:instructors,email,{$instructor->id}",
            'phone' => "nullable|string|max:15|unique:instructors,phone,{$instructor->id}",
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:MALE,FEMALE,OTHER',
            'designation' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'national_id_no' => 'nullable|string|max:20',
            'religion' => 'nullable|in:ISLAM,HINDUISM,CHRISTIANITY,BUDDHISM,OTHER',
            'address' => 'nullable|string',
            'status' => 'required|in:Active,Inactive',
            'media_id' => 'nullable|exists:media,id',
        ]);

        $instructor->update($data);

        return redirect()->route('instructors.index')->with('success', 'Instructor updated successfully.');
    }

    public function destroy(Instructor $instructor)
    {
        $instructor->delete();

        return redirect()->route('instructors.index')->with('success', 'Instructor deleted successfully.');
    }
}
