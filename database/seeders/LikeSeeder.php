<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Article;
use App\Infrastructure\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LikeSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $articles = Article::all();

        foreach ($articles as $article) {
            // Each post gets 0 to 10 likes
            $likeCount = rand(0, min(10, $users->count()));
            $likers = $users->random($likeCount);

            foreach ($likers as $user) {
                DB::table('likes')->updateOrInsert(
                    ['article_id' => $article->id, 'user_id' => $user->id],
                    ['created_at' => now(), 'updated_at' => now()]
                );
            }
        }
    }
}
