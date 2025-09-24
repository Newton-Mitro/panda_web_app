<?php

namespace Database\Seeders;

use App\Infrastructure\Models\HeroSlider;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class HeroSliderSeeder extends Seeder
{
    public function run(): void
    {
        // Grab only media entries with "images" in their path
        $allImages = Media::where('file_path', 'like', '%images%')->pluck('id');

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠ No media found containing "images" in file_path. Seed Media first!');
            return;
        }

        // Create 6 sliders, each with a random image ID from the filtered set
        HeroSlider::factory(6)->create([
            'media_id' => function () use ($allImages) {
                return $allImages->random();
            },
        ]);
    }
}
