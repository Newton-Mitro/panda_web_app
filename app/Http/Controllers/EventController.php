<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Event;
use App\Infrastructure\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $events = Event::with('media')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('events/index', [
            'events' => $events,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();

        return Inertia::render('events/create', [
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:events,slug',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'media_id' => 'nullable|exists:media,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        Event::create($data);

        return redirect()->route('events.index')->with('success', 'Event created.');
    }

    public function show(Event $event)
    {
        return Inertia::render('events/show', [
            'event' => $event->load('media'),
        ]);
    }

    public function edit(Event $event, Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();

        return Inertia::render('events/edit', [
            'event' => $event->load('media'),
            'media' => $media,
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:events,slug,' . $event->id,
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'media_id' => 'nullable|exists:media,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        $event->update($data);

        return redirect()->route('events.index')->with('success', 'Event updated.');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return redirect()->route('events.index')->with('success', 'Event deleted.');
    }
}
