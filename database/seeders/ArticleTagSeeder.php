<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Article;
use App\Infrastructure\Models\Tag;
use Illuminate\Database\Seeder;

class ArticleTagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = Tag::all();

        Article::all()->each(function ($article) use ($tags) {
            // attach 1 to 5 random tags per post
            $article->tags()->attach(
                $tags->random(rand(1, 5))->pluck('id')->toArray()
            );
        });
    }
}
