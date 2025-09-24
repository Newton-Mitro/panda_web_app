<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Gallery;
use App\Infrastructure\Models\GalleryMedia;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        // Get only image IDs (filter by file_path)
        $allImages = Media::where('file_path', 'like', '%images%')->pluck('id');

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠ No media found containing "images" in file_path. Seed Media first!');
            return;
        }

        // Create 5 galleries with random cover images
        $galleries = Gallery::factory(5)->create([
            'media_id' => function () use ($allImages) {
                return $allImages->random();
            },
        ]);

        foreach ($galleries as $gallery) {
            // Randomly pick 3–6 images for each gallery
            $mediaIds = $allImages->random(rand(3, 6));

            foreach ($mediaIds as $mediaId) {
                GalleryMedia::factory()->create([
                    'gallery_id' => $gallery->id,
                    'media_id' => $mediaId,
                ]);
            }
        }
    }
}
