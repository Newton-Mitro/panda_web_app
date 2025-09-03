<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Team;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);
        $teams = Team::with('media', 'category')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('teams/index', [
            'teams' => $teams,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Team')->get();

        return Inertia::render('teams/create', [
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
            'department' => 'nullable|string|max:255',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:Active,Inactive',
            'facebook_links' => 'nullable|string',
            'twitter_links' => 'nullable|string',
            'linkedin_links' => 'nullable|string',
            'instagram_links' => 'nullable|string',
            'youtube_links' => 'nullable|string',
            'pinterest_links' => 'nullable|string',
            'tiktok_links' => 'nullable|string',
            'snapchat_links' => 'nullable|string',
            'whatsapp_links' => 'nullable|string',
            'telegram_links' => 'nullable|string',
            'github_links' => 'nullable|string',
            'discord_links' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        Team::create($data);

        return redirect()->route('teams.index')->with('success', 'Team member created.');
    }

    public function show(Team $team)
    {
        return Inertia::render('teams/show', [
            'team' => $team->load('media', 'category'),
        ]);
    }

    public function edit(Team $team, Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Team')->get();

        return Inertia::render('teams/edit', [
            'team' => $team->load('media'),
            'categories' => $categories,
            'media' => $media,
        ]);
    }

    public function update(Request $request, Team $team)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'message' => 'nullable|string',
            'department' => 'nullable|string|max:255',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:Active,Inactive',
            'facebook_links' => 'nullable|string',
            'twitter_links' => 'nullable|string',
            'linkedin_links' => 'nullable|string',
            'instagram_links' => 'nullable|string',
            'youtube_links' => 'nullable|string',
            'pinterest_links' => 'nullable|string',
            'tiktok_links' => 'nullable|string',
            'snapchat_links' => 'nullable|string',
            'whatsapp_links' => 'nullable|string',
            'telegram_links' => 'nullable|string',
            'github_links' => 'nullable|string',
            'discord_links' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $team->update($data);

        return redirect()->route('teams.index')->with('success', 'Team member updated.');
    }

    public function destroy(Team $team)
    {
        $team->delete();
        return redirect()->route('teams.index')->with('success', 'Team member deleted.');
    }
}
