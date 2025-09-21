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
            // 'Product' => [
            //     'Electronics',
            //     'Clothing',
            //     'Books',
            //     'Home Appliances',
            //     'Sports',
            //     'Furniture',
            //     'Jewelry',
            //     'Beauty',
            // ],
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

        foreach ($categories as $categoryOf => $names) {
            foreach ($names as $name) {
                Category::factory()->create([
                    'category_of' => $categoryOf,
                    'name' => $name,
                    'slug' => Str::slug($name . '-' . strtolower($categoryOf)),
                    'description' => "{$name} main category",
                    'media_id' => Media::inRandomOrder()->first()->id,
                ]);
            }
        }
    }
}
