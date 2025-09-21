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
        $mediaItems = Media::inRandomOrder()->take(5)->get();

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
                $type = $this->faker->randomElement([
                    'json_array_with_image_title',
                    'json_array_with_image_title_and_subtitle',
                    'json_array_with_icon_title_and_subtitle',
                    'json_array_with_title',
                    'json_array_with_question_answer',
                ]);

                $content = $this->generateContent('custom_html');
                $jsonArray = $this->generateContent($type);

                PageSection::factory()->create([
                    'page_id' => $page->id,
                    'content' => $content,
                    'gallery' => $mediaItems->isNotEmpty()
                        ? json_encode($mediaItems->pluck('url')->toArray())
                        : null,
                    'json_array' => $jsonArray,
                    'media_id' => $allMedia->random()->id,
                ]);
            }
        }
    }

    private function generateContent(string $type): ?string
    {
        $faker = $this->faker;
        $allMedia = Media::all();

        switch ($type) {
            case 'json_array_with_image_title':
                return json_encode(
                    collect(range(1, rand(2, 4)))->map(fn() => [
                        'image' => $allMedia->random()?->url,
                        'title' => $faker->sentence(6),
                    ])->filter()->values()
                );

            case 'json_array_with_image_title_and_subtitle':
                return json_encode(
                    collect(range(1, rand(2, 4)))->map(fn() => [
                        'image' => $allMedia->random()?->url,
                        'title' => $faker->sentence(6),
                        'subtitle' => $faker->paragraph(),
                    ])->filter()->values()
                );

            case 'json_array_with_icon_title_and_subtitle':
                return json_encode(
                    collect(range(1, rand(2, 4)))->map(fn() => [
                        'icon' => 'fa fa-' . $faker->randomElement(['star', 'check', 'times', 'heart']),
                        'title' => $faker->sentence(4),
                        'subtitle' => $faker->paragraph(),
                    ])->values()
                );

            case 'json_array_with_title':
                return json_encode(
                    collect(range(1, rand(2, 4)))->map(fn() => [
                        'title' => $faker->sentence(6),
                    ])->values()
                );

            case 'json_array_with_question_answer':
                return json_encode(
                    collect(range(1, rand(2, 4)))->map(fn() => [
                        'question' => $faker->sentence(6) . '?',
                        'answer' => $faker->paragraph(),
                    ])->values()
                );

            case 'custom_html':
                return "<div><h3>{$faker->sentence(3)}</h3><p>{$faker->paragraph(6)}</p></div>";

            default:
                return null;
        }
    }
}
