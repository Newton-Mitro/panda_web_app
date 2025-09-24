<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all service categories once
        $serviceCategoryIds = Category::where('category_of', 'Service')->pluck('id');

        if ($serviceCategoryIds->isEmpty()) {
            $this->command->warn('⚠️ No Service categories found. Skipping ServiceSeeder.');
            return;
        }

        // Fetch all media once
        $allImages = Media::where(function ($query) {
            $query->where('file_path', 'like', '%images%');
        })->get();

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping ServiceSeeder.');
            return;
        }

        $serviceCount = 9;

        for ($i = 0; $i < $serviceCount; $i++) {
            Service::factory()->create([
                'category_id' => $serviceCategoryIds->random(),
                'media_id' => $allImages->random()->id,
                'gallery' => $allImages->random(rand(1, 5))->pluck('url')->toArray()
            ]);
        }


        $this->command->info("✅ {$serviceCount} services seeded with random categories, media, and galleries.");
    }
}
