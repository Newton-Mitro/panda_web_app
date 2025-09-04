<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Career;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        $careers = Career::latest()->paginate(15);

        return Inertia::render('careers/index', [
            'careers' => $careers,
        ]);
    }

    public function create()
    {
        return Inertia::render('careers/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
            'status' => 'required|in:open,closed,draft',
            'media_id' => 'nullable|integer',
        ]);

        Career::create($data);

        return redirect()->route('careers.index')
            ->with('success', 'Career created successfully.');
    }

    public function edit(Career $career)
    {
        return Inertia::render('careers/edit', [
            'career' => $career,
        ]);
    }

    public function update(Request $request, Career $career)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
            'status' => 'required|in:open,closed,draft',
            'media_id' => 'nullable|integer',
        ]);

        $career->update($data);

        return redirect()->route('careers.index')
            ->with('success', 'Career updated successfully.');
    }

    public function show(Career $career)
    {
        return Inertia::render('careers/show', [
            'career' => $career,
        ]);
    }

    public function destroy(Career $career)
    {
        $career->delete();

        return redirect()->route('careers.index')
            ->with('success', 'Career deleted successfully.');
    }
}
