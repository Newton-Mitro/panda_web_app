<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Infrastructure\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $articles = Article::with('categories', 'tags', 'author')->paginate(15);
        return view('articles.index', compact('articles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('articles.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $article = Article::create($data);

        // Attach categories or tags if applicable
        if (isset($data['categories'])) {
            $article->categories()->sync($data['categories']);
        }
        if (isset($data['tags'])) {
            $article->tags()->sync($data['tags']);
        }

        return redirect()->route('articles.index')
            ->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article): View
    {
        return view('articles.show', compact('post'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article): View
    {
        return view('articles.edit', compact('post'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Article $article): RedirectResponse
    {
        $data = $request->validated();

        $article->update($data);

        // Update categories or tags
        if (isset($data['categories'])) {
            $article->categories()->sync($data['categories']);
        }
        if (isset($data['tags'])) {
            $article->tags()->sync($data['tags']);
        }

        return redirect()->route('articles.index')
            ->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();

        return redirect()->route('articles.index')
            ->with('success', 'Post deleted successfully.');
    }
}
