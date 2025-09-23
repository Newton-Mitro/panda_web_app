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
            'Company Overview',
            'Mission & Vision',
            'Core Values',
            'Finance Options',
            'CAPEX Model',
            'OPEX Model',
            'Debt Model',
            'Disclaimer',
            'Terms of Service',
            'Privacy Policy',
        ];

        $allMedia = Media::all();

        foreach ($pages as $pageTitle) {
            $page = Page::factory()->create([
                'title' => $pageTitle,
                'slug' => Str::slug($pageTitle),
                'meta_title' => $pageTitle,
                'meta_description' => "{$pageTitle} page description.",
                'meta_keywords' => "{$pageTitle} page keywords.",
                'media_id' => $allMedia->random()->id,
            ]);

            $sectionCount = rand(2, 4);

            for ($i = 0; $i < $sectionCount; $i++) {
                // Pick a random section type
                $type = $this->faker->randomElement([
                    'json_array_with_image_title',
                    'json_array_with_image_title_and_subtitle',
                    'json_array_with_icon_title_and_subtitle',
                    'json_array_with_title',
                    'json_array_with_question_answer',
                ]);

                // Generate gallery items (random 5 media)
                $allMedia = Media::all(); // Eloquent models
                $mediaItems = $allMedia->shuffle()->take(5)->map(fn($media) => $media->url)->toArray();

                PageSection::factory()->create([
                    'page_id' => $page->id,
                    'heading' => $this->faker->sentence(),
                    'sub_heading' => $this->faker->sentence(),
                    'button_text' => 'Click me',
                    'button_link' => 'https://example.com',
                    'content' => $this->generateContent(),                       // HTML content
                    'json_array' => json_encode($this->generateJsonArray($type)), // JSON string
                    'gallery' => json_encode($mediaItems),                       // JSON string
                    'media_id' => $allMedia->random()->id,
                    'sort_order' => rand(1, 100),
                ]);
            }
        }
    }

    private function generateContent(): string
    {
        $faker = $this->faker;
        return "<div><h3>{$faker->sentence(3)}</h3><p>{$faker->paragraph(6)}</p></div>";
    }

    private function generateJsonArray(string $type): array
    {
        $faker = $this->faker;
        $allMedia = Media::all();

        switch ($type) {
            case 'json_array_with_image_title':
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'image' => $allMedia->random()?->url,
                    'title' => $faker->sentence(6),
                ])->values()->toArray();

            case 'json_array_with_image_title_and_subtitle':
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'image' => $allMedia->random()?->url,
                    'title' => $faker->sentence(6),
                    'subtitle' => $faker->paragraph(),
                ])->values()->toArray();

            case 'json_array_with_icon_title_and_subtitle':
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'icon' => 'fa fa-' . $faker->randomElement(['star', 'check', 'times', 'heart']),
                    'title' => $faker->sentence(4),
                    'subtitle' => $faker->paragraph(),
                ])->values()->toArray();

            case 'json_array_with_title':
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'title' => $faker->sentence(6),
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
