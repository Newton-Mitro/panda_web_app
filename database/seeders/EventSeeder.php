<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Event;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all event categories once
        $eventCategoryIds = Category::where('category_of', 'Event')->pluck('id');

        if ($eventCategoryIds->isEmpty()) {
            $this->command->warn('⚠️ No Event categories found. Skipping EventSeeder.');
            return;
        }

        // Fetch all media once
        $allImages = Media::where(function ($query) {
            $query->where('file_path', 'like', '%images%');
        })->get();

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping EventSeeder.');
            return;
        }

        $eventCount = 9;
        for ($i = 0; $i < $eventCount; $i++) {
            Event::factory()->create(
                [
                    'category_id' => $eventCategoryIds->random(),
                    'media_id' => $allImages->random()->id
                ]
            );
        }

        $this->command->info("✅ {$eventCount} events seeded with random categories and media.");
    }
}
