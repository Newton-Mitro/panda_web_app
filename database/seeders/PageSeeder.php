<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Page;
use App\Infrastructure\Models\PageSection;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class PageSeeder extends Seeder
{
    private $faker;

    public function __construct()
    {
        $this->faker = Faker::create();
    }

    public function run(): void
    {
        $pages = [
            'Home',
            'About Us',
            'Our Story',
            'FAQ',
            'Company Overview',
            'Mission & Vision',
            'Core Values',
            'Disclaimer',
            'Terms of Service',
            'Privacy Policy',
        ];

        $allImages = Media::where(function ($query) {
            $query->where('file_path', 'like', '%images%');
        })->get();

        foreach ($pages as $pageTitle) {
            $page = Page::factory()->create([
                'title' => $pageTitle,
                'slug' => Str::slug($pageTitle),
                'meta_title' => $pageTitle,
                'meta_description' => "{$pageTitle} page description.",
                'meta_keywords' => "{$pageTitle} page keywords.",
                'media_id' => $allImages->random()->id,
            ]);

            $sectionCount = rand(2, 4);

            for ($i = 0; $i < $sectionCount; $i++) {
                // Pick a random section type
                $jsonArrayType = $this->faker->randomElement([
                    'json_array_with_image',
                    'json_array_with_img_icon',
                    'json_array_with_icon',
                    'json_array_with_question_answer',
                ]);

                $contentType = $this->faker->randomElement([
                    "TEXT",
                    "HTML",

                ]);

                $galleryImages = $allImages->shuffle()->take(5)->map(fn($media) => $media->url)->toArray();

                PageSection::factory()->create([
                    'page_id' => $page->id,
                    'heading' => $this->faker->name(),
                    'sub_heading' => $this->faker->sentence(),
                    'button_text' => 'Click me',
                    'button_link' => 'https://example.com',
                    'content_type' => $contentType,
                    'content' => $this->generateContent($contentType),                       // HTML content
                    'json_array' => json_encode($this->generateJsonArray($jsonArrayType)), // JSON string
                    'gallery' => json_encode($galleryImages),                       // JSON string
                    'media_id' => $allImages->random()->id,
                    'sort_order' => rand(1, 100),
                ]);
            }
        }
    }

    private function generateContent($contentType): string
    {
        $faker = $this->faker;

        switch ($contentType) {

            case "HTML":
                return "<div><h3>{$faker->sentence(3)}</h3><p>{$faker->paragraph(6)}</p></div>";

            case "TEXT":
                return $faker->paragraph(6);

            default:
                return "";

        }
    }

    private function generateJsonArray(string $type): array
    {
        $faker = $this->faker;
        $allImages = Media::where(function ($query) {
            $query->where('file_path', 'like', '%images%');
        })->get();

        $allIcons = Media::where(function ($query) {
            $query->where('file_path', 'like', '%icons%');
        })->get();

        switch ($type) {
            case 'json_array_with_image':
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'image' => $allImages->random()?->url,
                    'title' => $faker->sentence(6),
                    'subtitle' => $faker->paragraph(),
                ])->values()->toArray();

            case 'json_array_with_img_icon':
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'img_icon' => $allIcons->random()?->url,
                    'title' => $faker->sentence(6),
                    'subtitle' => $faker->paragraph(),
                ])->values()->toArray();

            case 'json_array_with_icon':
                $icons = [
                    'star',
                    'check',
                    'times',
                    'heart',
                    'bolt',
                    'smile',
                    'coffee',
                    'cog',
                    'gift',
                    'leaf',
                    'music',
                    'fire',
                    'bug',
                    'camera',
                    'thumbs-up'
                ];
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'icon' => 'fa fa-' . $faker->randomElement($icons),
                    'title' => $faker->sentence(4),
                    'subtitle' => $faker->paragraph(),
                ])->values()->toArray();

            case 'json_array_with_question_answer':
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'question' => $faker->sentence(6) . '?',
                    'answer' => $faker->paragraph(),
                ])->values()->toArray();

            default:
                return [];
        }
    }
}
