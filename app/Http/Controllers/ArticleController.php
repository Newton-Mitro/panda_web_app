<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Article;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $articles = Article::with(['media', 'category', 'user'])
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('articles/index', [
            'articles' => $articles,
        ]);
    }

    public function create(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Article')->get();

        return Inertia::render('articles/create', [
            'media' => $media,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:articles,slug',
            'content' => 'required|string',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'nullable|in:draft,published,archived',
            'published_at' => 'nullable|date',
        ]);

        // Generate slug if not provided
        $title = $request->input('title');
        $data['slug'] = $data['slug'] ?: Str::slug($title) . '-' . Str::random(6);

        // Default to draft
        $data['status'] = $data['status'] ?? 'draft';

        // Associate with logged-in user
        $data['user_id'] = $request->user()->id;

        Article::create($data);

        return redirect()->route('articles.index')->with('success', 'Article created.');
    }

    public function show(Article $article)
    {
        return Inertia::render('articles/show', [
            'article' => $article->load(['media', 'category', 'user']),
        ]);
    }

    public function edit(Article $article, Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Article')->get();

        return Inertia::render('articles/edit', [
            'article' => $article->load(['media', 'category']),
            'media' => $media,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:articles,slug,' . $article->id,
            'content' => 'required|string',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
        ]);

        $article->update($data);

        return redirect()->route('articles.index')->with('success', 'Article updated.');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('articles.index')->with('success', 'Article deleted.');
    }
}
