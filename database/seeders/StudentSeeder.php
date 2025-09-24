<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all student categories once
        $studentCategoryIds = Category::where('category_of', 'Student')->pluck('id');

        if ($studentCategoryIds->isEmpty()) {
            $this->command->warn('⚠️ No Student categories found. Skipping StudentSeeder.');
            return;
        }

        // Fetch all media once
        $allImages = Media::where(function ($query) {
            $query->where('file_path', 'like', '%images%');
        })->get();

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping StudentSeeder.');
            return;
        }

        $studentCount = 29;
        for ($i = 0; $i < $studentCount; $i++) {
            Student::factory()->create(
                [
                    'category_id' => $studentCategoryIds->random(),
                    'media_id' => $allImages->random()->id
                ]
            );
        }

        $this->command->info("✅ {$studentCount} students seeded with random categories and media.");
    }
}
