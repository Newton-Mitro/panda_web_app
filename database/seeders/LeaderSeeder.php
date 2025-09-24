<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Leader;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class LeaderSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all leader categories once
        $leaderCategoryIds = Category::where('category_of', 'Leader')->pluck('id');

        if ($leaderCategoryIds->isEmpty()) {
            $this->command->warn('⚠️ No Leader categories found. Skipping LeaderSeeder.');
            return;
        }

        // Fetch all media once
        $allImages = Media::where(function ($query) {
            $query->where('file_path', 'like', '%images%');
        })->get();

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping LeaderSeeder.');
            return;
        }

        $leaderCount = 9;
        for ($i = 0; $i < $leaderCount; $i++) {
            Leader::factory()->create(
                [
                    'category_id' => $leaderCategoryIds->random(),
                    'media_id' => $allImages->random()->id
                ]
            );
        }

        $this->command->info("✅ {$leaderCount} leaders seeded with random categories and media.");
    }
}
