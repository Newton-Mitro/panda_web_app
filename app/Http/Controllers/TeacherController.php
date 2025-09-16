<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Teacher;
use App\Infrastructure\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);
        $teachers = Teacher::with('media')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('teachers/index', [
            'teachers' => $teachers,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();

        return Inertia::render('teachers/create', [
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'teacher_id' => 'required|string|max:20|unique:teachers',
            'name' => 'required|string|max:100',
            'bio' => 'nullable|string|max:100',
            'email' => 'required|email|unique:teachers',
            'phone' => 'nullable|string|max:15|unique:teachers',
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

        Teacher::create($data);

        return redirect()->route('teachers.index')->with('success', 'Teacher created successfully.');
    }

    public function show(Teacher $teacher)
    {
        return Inertia::render('teachers/show', [
            'teacher' => $teacher->load('media'),
        ]);
    }

    public function edit(Teacher $teacher, Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();

        return Inertia::render('teachers/edit', [
            'teacher' => $teacher->load('media'),
            'media' => $media,
        ]);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $data = $request->validate([
            'teacher_id' => 'required|string|max:20|unique:teachers,teacher_id,' . $teacher->id,
            'name' => 'required|string|max:100',
            'bio' => 'nullable|string|max:100',
            'email' => 'required|email|unique:teachers,email,' . $teacher->id,
            'phone' => 'nullable|string|max:15|unique:teachers,phone,' . $teacher->id,
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

        $teacher->update($data);

        return redirect()->route('teachers.index')->with('success', 'Teacher updated successfully.');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return redirect()->route('teachers.index')->with('success', 'Teacher deleted successfully.');
    }
}
