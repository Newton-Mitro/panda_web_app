<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Page;
use App\Infrastructure\Models\PageSection;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class CustomPageSeeder extends Seeder
{
    private $faker;

    public function __construct()
    {
        $this->faker = Faker::create();
    }

    public function run(): void
    {
        $pages = [
            'Home' => [
                'sections' => [
                    ['heading' => 'Welcome to Our Company', 'sub_heading' => 'Building the future, one step at a time.'],
                    ['heading' => 'Our Services', 'sub_heading' => 'We deliver excellence in every solution.'],
                    ['heading' => 'Client Testimonials', 'sub_heading' => 'Hear from our valued clients.'],
                ],
            ],
            'About Us' => [
                'sections' => [
                    ['heading' => 'Who We Are', 'sub_heading' => 'Passionate innovators shaping tomorrow.'],
                    ['heading' => 'Our Journey', 'sub_heading' => 'From a small team to global impact.'],
                ],
            ],
            'Our Story' => [
                'sections' => [
                    ['heading' => 'How It All Started', 'sub_heading' => 'Our humble beginnings.'],
                ],
            ],
            'FAQ' => [
                'sections' => [
                    ['heading' => 'Frequently Asked Questions', 'sub_heading' => 'We’ve got answers for you.'],
                ],
            ],
            'Company Overview' => [],
            'Mission & Vision' => [],
            'Core Values' => [],
            'Disclaimer' => [],
            'Terms of Service' => [],
            'Privacy Policy' => [],
        ];

        $allImages = Media::where('file_path', 'like', '%images%')->get();
        $allIcons = Media::where('file_path', 'like', '%icons%')->get();

        foreach ($pages as $pageTitle => $pageData) {
            $page = Page::factory()->create([
                'title' => $pageTitle,
                'slug' => Str::slug($pageTitle),
                'meta_title' => $pageTitle,
                'meta_description' => "{$pageTitle} page description.",
                'meta_keywords' => "{$pageTitle} page keywords.",
                'media_id' => $allImages->random()->id ?? null,
            ]);

            $sections = $pageData['sections'] ?? [];
            $sectionCount = count($sections) > 0 ? count($sections) : rand(1, 2);

            for ($i = 0; $i < $sectionCount; $i++) {
                $sectionConfig = $sections[$i] ?? [
                    'heading' => $this->faker->catchPhrase(),
                    'sub_heading' => $this->faker->sentence(),
                ];

                $jsonArrayType = $this->faker->randomElement([
                    'json_array_with_image',
                    'json_array_with_img_icon',
                    'json_array_with_icon',
                    'json_array_with_question_answer',
                ]);

                $contentType = $this->faker->randomElement(['TEXT', 'HTML']);
                $galleryImages = $allImages->shuffle()->take(5)->map(fn($media) => $media->url)->toArray();

                PageSection::factory()->create([
                    'page_id' => $page->id,
                    'heading' => $sectionConfig['heading'],
                    'sub_heading' => $sectionConfig['sub_heading'],
                    'button_text' => $this->faker->boolean ? 'Learn More' : null,
                    'button_link' => $this->faker->boolean ? 'https://example.com' : null,
                    'content_type' => $contentType,
                    'content' => $this->generateContent($contentType),
                    'json_array' => json_encode($this->generateJsonArray($jsonArrayType, $allImages, $allIcons, $pageTitle)),
                    'gallery' => json_encode($galleryImages),
                    'media_id' => $allImages->random()->id ?? null,
                    'sort_order' => $i + 1,
                ]);
            }
        }
    }

    private function generateContent(string $contentType): string
    {
        return $contentType === "HTML"
            ? "<div><h3>{$this->faker->sentence(3)}</h3><p>{$this->faker->paragraph(6)}</p></div>"
            : $this->faker->paragraph(6);
    }

    private function generateJsonArray(string $type, $allImages, $allIcons, string $pageTitle): array
    {
        // If the page is FAQ, always generate question-answer array
        if ($pageTitle === 'FAQ') {
            $type = 'json_array_with_question_answer';
        }

        switch ($type) {
            case 'json_array_with_image':
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'image' => $allImages->random()?->url,
                    'title' => $this->faker->sentence(6),
                    'subtitle' => $this->faker->paragraph(),
                ])->toArray();

            case 'json_array_with_img_icon':
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'img_icon' => $allIcons->random()?->url,
                    'title' => $this->faker->sentence(6),
                    'subtitle' => $this->faker->paragraph(),
                ])->toArray();

            case 'json_array_with_icon':
                $icons = ['star', 'check', 'times', 'heart', 'bolt', 'smile', 'coffee', 'cog', 'gift', 'leaf', 'music', 'fire', 'bug', 'camera', 'thumbs-up'];
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'icon' => 'fa fa-' . $this->faker->randomElement($icons),
                    'title' => $this->faker->sentence(4),
                    'subtitle' => $this->faker->paragraph(),
                ])->toArray();

            case 'json_array_with_question_answer':
                return collect(range(1, rand(2, 4)))->map(fn() => [
                    'question' => $this->faker->sentence(6) . '?',
                    'answer' => $this->faker->paragraph(),
                ])->toArray();

            default:
                return [];
        }
    }

}
