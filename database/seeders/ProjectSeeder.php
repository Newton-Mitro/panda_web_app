<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all project categories once
        $projectCategoryIds = Category::where('category_of', 'Project')->pluck('id');

        if ($projectCategoryIds->isEmpty()) {
            $this->command->warn('⚠️ No Project categories found. Skipping ProjectSeeder.');
            return;
        }

        // Fetch all media once
        $allMedia = Media::all();

        if ($allMedia->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping ProjectSeeder.');
            return;
        }

        $projectCount = 9;

        Project::factory($projectCount)->create(
            [
                'category_id' => $projectCategoryIds->random(),
                'media_id' => $allMedia->random()->id,
                'gallery' => $allMedia->random(rand(1, 5))->pluck('url')->toArray()
            ]
        );

        $this->command->info("✅ {$projectCount} projects seeded with random categories, media, and galleries.");
    }
}
