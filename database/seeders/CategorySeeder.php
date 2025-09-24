<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Service' => [
                'Renewable Energy Solutions',
                'Industrial Solutions & Services',
                'Consulting Services',
                'Operation & Maintenance',
            ],
            'Team' => [
                'Management',
                'Engineering',
                'Design',
                'Marketing',
                'Sales',
                'Customer Support',
            ],
            'Leader' => ['Directors'],
            'Student' => [
                'Class I',
                'Class II',
                'Class III',
                'Class IV',
                'Class V',
                'Class VI',
                'Class VII',
                'Class VIII',
                'Class IX',
                'Class X',
            ],
            'Article' => ['Tech Insights', 'Business Strategy', 'Lifestyle'],
            'Event' => ['Conferences', 'Workshops', 'Meetups'],
            'Notice' => ['Announcements', 'Exams', 'General Notices'],
            'Project' => ['Open Source', 'Client Work', 'Internal Tools'],
        ];

        // Preload all available image IDs
        $allImages = Media::where('file_path', 'like', '%images%')->pluck('id');

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠ No media found containing "images" in file_path. Seed Media first!');
            return;
        }

        foreach ($categories as $categoryOf => $names) {
            foreach ($names as $name) {
                Category::factory()->create([
                    'category_of' => $categoryOf,
                    'name' => $name,
                    'slug' => Str::slug($name . '-' . strtolower($categoryOf)),
                    'description' => "{$name} main category",
                    'media_id' => $allImages->random(),
                ]);
            }
        }
    }
}
