<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Notice;
use Illuminate\Database\Seeder;

class NoticeSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all notice categories once
        $noticeCategoryIds = Category::where('category_of', 'Notice')->pluck('id');

        if ($noticeCategoryIds->isEmpty()) {
            $this->command->warn('⚠️ No Notice categories found. Skipping NoticeSeeder.');
            return;
        }

        // Fetch all media once
        $allImages = Media::where(function ($query) {
            $query->where('file_path', 'like', '%images%');
        })->get();

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping NoticeSeeder.');
            return;
        }

        $noticeCount = 9;
        for ($i = 0; $i < $noticeCount; $i++) {
            Notice::factory()->create(
                [
                    'category_id' => $noticeCategoryIds->random(),
                    'media_id' => $allImages->random()->id
                ]
            );
        }

        $this->command->info("✅ {$noticeCount} notices seeded with random categories and media.");
    }
}
