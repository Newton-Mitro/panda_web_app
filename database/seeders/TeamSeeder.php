<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Team;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all team categories once
        $teamCategoryIds = Category::where('category_of', 'Team')->pluck('id');

        if ($teamCategoryIds->isEmpty()) {
            $this->command->warn('⚠️ No Team categories found. Skipping TeamSeeder.');
            return;
        }

        // Fetch all media once
        $allImages = Media::where(function ($query) {
            $query->where('file_path', 'like', '%images%');
        })->get();

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping TeamSeeder.');
            return;
        }

        $teamCount = 8;
        for ($i = 0; $i < $teamCount; $i++) {
            Team::factory()->create(
                [
                    'category_id' => $teamCategoryIds->random(),
                    'media_id' => $allImages->random()->id
                ]
            );
        }

        $this->command->info("✅ {$teamCount} team members seeded with random categories and media.");
    }
}
