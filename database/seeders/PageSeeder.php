<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $pages = [
            [
                'title' => 'Home',
                'children' => [],
            ],
            [
                'title' => 'About Us',
                'children' => [
                    'Our Story',
                    'Philosophy',
                    'Certifications & Accreditations',
                ],
            ],
            [
                'title' => 'Programs',
                'children' => [
                    'Infant Care',
                    'Toddler Care',
                    'Preschool',
                    'After-school Care',
                ],
            ],
            [
                'title' => 'Admissions',
                'children' => [
                    'How to Enroll',
                    'Tuition & Fees',
                    'FAQs',
                ],
            ],
            [
                'title' => 'Parent Resources',
                'children' => [
                    'Handbook',
                    'Nutrition & Meals',
                    'Health & Safety',
                    'Communication',
                ],
            ],
            [
                'title' => 'Facilities',
                'children' => [
                    'Virtual Tour',
                    'Safety Measures',
                ],
            ],
            [
                'title' => 'Disclaimer',
                'children' => [],
            ],
            [
                'title' => 'Terms of Service',
                'children' => [],
            ],
            [
                'title' => 'Privacy Policy',
                'children' => [],
            ],
        ];

        foreach ($pages as $page) {
            $parentId = DB::table('pages')->insertGetId([
                'title' => $page['title'],
                'slug' => Str::slug($page['title']),
                'meta_title' => $page['title'],
                'meta_description' => $page['title'] . ' page description.',
                'parent_id' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            foreach ($page['children'] as $childTitle) {
                DB::table('pages')->insert([
                    'title' => $childTitle,
                    'slug' => Str::slug($childTitle),
                    'meta_title' => $childTitle,
                    'meta_description' => $childTitle . ' page description.',
                    'parent_id' => $parentId,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
