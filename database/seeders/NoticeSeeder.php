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
        $allMedia = Media::all();

        if ($allMedia->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping NoticeSeeder.');
            return;
        }

        $noticeCount = 9;

        Notice::factory($noticeCount)->create(
            [
                'category_id' => $noticeCategoryIds->random(),
                'media_id' => $allMedia->random()->id
            ]
        );

        $this->command->info("✅ {$noticeCount} notices seeded with random categories and media.");
    }
}
