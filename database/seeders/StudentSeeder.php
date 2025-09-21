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
        $allMedia = Media::all();

        if ($allMedia->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping StudentSeeder.');
            return;
        }

        $studentCount = 29;

        Student::factory($studentCount)->create(
            [
                'category_id' => $studentCategoryIds->random(),
                'media_id' => $allMedia->random()->id
            ]
        );

        $this->command->info("✅ {$studentCount} students seeded with random categories and media.");
    }
}
