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
        $allImages = Media::where(function ($query) {
            $query->where('file_path', 'like', '%images%');
        })->get();

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping ProjectSeeder.');
            return;
        }

        $projectCount = 9;

        for ($i = 0; $i < $projectCount; $i++) {
            Project::factory()->create([
                'category_id' => $projectCategoryIds->random(),
                'media_id' => $allImages->random()->id,
                'gallery' => $allImages->random(rand(1, 5))->pluck('url')->toArray()
            ]);
        }

        $this->command->info("✅ {$projectCount} projects seeded with random categories, media, and galleries.");
    }
}
