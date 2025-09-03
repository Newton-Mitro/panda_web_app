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
        // Collect seeded media IDs
        $mediaIds = Media::pluck('id')->toArray();

        $categories = [
            'Product' => [
                'Electronics' => ['Mobiles', 'Laptops', 'Cameras'],
                'Clothing' => ['Men', 'Women', 'Kids'],
                'Books' => ['Fiction', 'Non-fiction', 'Education'],
                'Home Appliances' => ['Kitchen', 'Living Room', 'Bedroom'],
                'Sports' => ['Football', 'Basketball', 'Tennis'],
                'Furniture' => ['Bedroom', 'Living Room', 'Kitchen'],
                'Jewelry' => ['Necklaces', 'Earrings', 'Rings'],
                'Beauty' => ['Makeup', 'Skincare', 'Haircare'],
            ],
            'Service' => [
                'Development' => ['Web Development', 'Mobile Development'],
                'Design' => ['UI/UX Design', 'Graphic Design'],
                // 'Marketing' => ['SEO', 'Content Marketing'],
                'Solar Energy' => ['Installation', 'Maintenance', 'Repairs', 'Sales'],
                'Real Estate' => ['Buying', 'Selling', 'Renting'],
                // 'Legal Services' => ['Legal Advice', 'Court Proceedings'],
                // 'Financial Services' => ['Banking', 'Insurance', 'Investment', 'Loan'],
                // 'Transportation' => ['Air', 'Rail', 'Road', 'Maritime'],
                'Healthcare' => ['Diagnostics', 'Therapy', 'Medicine'],
                'Educational Services' => ['Tutoring', 'Academy', 'Training'],
                'Tourism' => ['Hotels', 'Restaurants', 'Attractions'],
            ],
            'Team' => [
                'Management' => ['Leadership'],
                'Engineering' => ['Backend', 'Frontend', 'DevOps'],
                'Design' => ['UI', 'UX'],
                'Marketing' => ['Digital', 'Offline'],
                'School' => ['Teachers', 'School Staff'],
                'Hospital' => ['Doctors', 'Nurses'],
                'Salons' => ['Hairdressers', 'Makeup Artists'],
                'Restaurants' => ['Chefs', 'Waiters'],
            ],
            'Blog' => [
                'Tech Insights' => ['AI', 'Cloud', 'Programming'],
                'Business Strategy' => ['Startups', 'Leadership'],
                'Lifestyle' => ['Health', 'Travel', 'Food'],
            ],
            'Event' => [
                'Conferences' => ['Tech Summit', 'Business Expo'],
                'Workshops' => ['Coding Bootcamp', 'Design Thinking'],
                'Meetups' => ['Developers', 'Designers'],
            ],
            'Notice' => [
                'Announcements' => ['Policy Updates', 'New Releases'],
                'Exams' => ['Schedules', 'Results'],
                'General Notices' => ['Holidays', 'Maintenance'],
            ],
            'Project' => [
                'Open Source' => ['Libraries', 'Tools'],
                'Client Work' => ['Websites', 'Apps'],
                'Internal Tools' => ['Dashboards', 'APIs'],
            ],
        ];

        foreach ($categories as $categoryOf => $parents) {
            foreach ($parents as $parentName => $children) {
                // Ensure parent slug uniqueness
                $parent = Category::firstOrCreate(
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

                foreach ($children as $childName) {
                    // Ensure child slug uniqueness
                    Category::firstOrCreate(
                        [
                            'name' => $childName,
                            'category_of' => $categoryOf,
                        ],
                        [
                            'slug' => Str::slug($childName . '-' . strtolower($categoryOf)),
                            'description' => $childName . ' subcategory',
                            'parent_id' => $parent->id,
                            'media_id' => $mediaIds[array_rand($mediaIds)] ?? null,
                        ]
                    );
                }
            }
        }
    }
}
