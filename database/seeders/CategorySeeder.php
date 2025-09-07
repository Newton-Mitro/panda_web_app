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
        $mediaIds = Media::pluck('id')->toArray();

        $categories = [
            'Product' => [
                'Electronics',
                'Clothing',
                'Books',
                'Home Appliances',
                'Sports',
                'Furniture',
                'Jewelry',
                'Beauty',
            ],
            'Service' => [
                'Development',
                'Design',
                'Marketing',
                'Solar Energy',
                'Real Estate',
                'Legal Services',
                'Financial Services',
                'Transportation',
                'Healthcare',
                'Educational Services',
                'Tourism',
            ],
            'Team' => [
                'Management',
                'Engineering',
                'Design',
                'Marketing',
                'Sales',
                'Customer Support',
            ],
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
            'Article' => [
                'Tech Insights',
                'Business Strategy',
                'Lifestyle',
            ],
            'Event' => [
                'Conferences',
                'Workshops',
                'Meetups',
            ],
            'Notice' => [
                'Announcements',
                'Exams',
                'General Notices',
            ],
            'Project' => [
                'Open Source',
                'Client Work',
                'Internal Tools',
            ],
        ];

        foreach ($categories as $categoryOf => $parentCategories) {
            foreach ($parentCategories as $parentName) {
                Category::firstOrCreate(
                    [
                        'name' => $parentName,
                        'category_of' => $categoryOf,
                    ],
                    [
                        'slug' => Str::slug($parentName . '-' . strtolower($categoryOf)),
                        'description' => $parentName . ' main category',
                        'media_id' => $mediaIds[array_rand($mediaIds)] ?? null,
                    ]
                );
            }
        }
    }
}
