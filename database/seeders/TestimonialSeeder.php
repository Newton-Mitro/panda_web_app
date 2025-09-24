<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        // Get all image IDs
        $allImages = Media::where('file_path', 'like', '%images%')->pluck('id');

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠ No media found containing "images" in file_path. Seed Media first!');
            return;
        }

        // Create 11 testimonials with random media IDs
        Testimonial::factory(11)->create([
            'media_id' => function () use ($allImages) {
                return $allImages->random();
            },
        ]);
    }
}
