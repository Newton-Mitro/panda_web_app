<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Article;
use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all article categories once
        $articleCategoryIds = Category::where('category_of', 'Article')->pluck('id');

        if ($articleCategoryIds->isEmpty()) {
            $this->command->warn('⚠️ No Article categories found. Skipping ArticleSeeder.');
            return;
        }

        // Fetch all media and users once
        $allMedia = Media::all();
        $allUsers = User::all();

        if ($allMedia->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping ArticleSeeder.');
            return;
        }

        if ($allUsers->isEmpty()) {
            $this->command->warn('⚠️ No users found. Skipping ArticleSeeder.');
            return;
        }

        $articleCount = 9;
        for ($i = 0; $i < $articleCount; $i++) {
            Article::factory()->create([
                'category_id' => $articleCategoryIds->random(),
                'media_id' => $allMedia->random()->id,
                'user_id' => $allUsers->random()->id,
            ]);
        }

        $this->command->info("✅ {$articleCount} articles seeded with random categories, media, and users.");
    }
}
