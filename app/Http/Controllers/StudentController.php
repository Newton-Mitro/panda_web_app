<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Student;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);
        $students = Student::with('media', 'category')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('students/index', [
            'students' => $students,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Student')->get();

        return Inertia::render('students/create', [
            'categories' => $categories,
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'required|string|max:20|unique:students,student_id',
            'first_name' => 'required|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'email' => 'nullable|email|unique:students,email',
            'phone' => 'nullable|string|unique:students,phone',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:MALE,FEMALE,OTHER',
            'designation' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'roll_number' => 'required|string|max:50',
            'category_id' => 'nullable|exists:categories,id',
            'birth_registration_no' => 'nullable|string|max:20',
            'national_id_no' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'guardian_name' => 'nullable|string|max:150',
            'guardian_phone' => 'nullable|string|max:15',
            'media_id' => 'nullable|exists:media,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        Student::create($data);

        return redirect()->route('students.index')->with('success', 'Student created.');
    }

    public function show(Student $student)
    {
        return Inertia::render('students/show', [
            'student' => $student->load('media', 'category'),
        ]);
    }

    public function edit(Student $student, Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Student')->get();

        return Inertia::render('students/edit', [
            'student' => $student->load('media'),
            'categories' => $categories,
            'media' => $media,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $data = $request->validate([
            'student_id' => 'required|string|max:20|unique:students,student_id,' . $student->id,
            'first_name' => 'required|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'email' => 'nullable|email|unique:students,email,' . $student->id,
            'phone' => 'nullable|string|unique:students,phone,' . $student->id,
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:MALE,FEMALE,OTHER',
            'designation' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'roll_number' => 'required|string|max:50',
            'category_id' => 'nullable|exists:categories,id',
            'birth_registration_no' => 'nullable|string|max:20',
            'national_id_no' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'guardian_name' => 'nullable|string|max:150',
            'guardian_phone' => 'nullable|string|max:15',
            'media_id' => 'nullable|exists:media,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        $student->update($data);

        return redirect()->route('students.index')->with('success', 'Student updated.');
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('students.index')->with('success', 'Student deleted.');
    }
}
