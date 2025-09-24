<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Award;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class AwardSeeder extends Seeder
{
    public function run(): void
    {
        // Get all image IDs
        $allImages = Media::where('file_path', 'like', '%icons%')->pluck('id');

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠ No media found containing "icons" in file_path. Seed Media first!');
            return;
        }

        // Create 5 awards with random media IDs
        Award::factory(5)->create([
            'media_id' => function () use ($allImages) {
                return $allImages->random();
            },
        ]);
    }
}
