<?php

namespace Database\Factories;

use App\Infrastructure\Models\PageSection;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

class PageSectionFactory extends Factory
{
    protected $model = PageSection::class;

    public function definition(): array
    {
        $faker = $this->faker;
        return [
            'page_id' => PageFactory::new(), // assign in seeder
            'heading' => $faker->sentence(3),
            'sub_heading' => $faker->sentence(6),
            'button_text' => $faker->optional()->word(),
            'button_link' => $faker->optional()->url(),
            'content' => null,
            'json_array' => null,
            'gallery' => $faker->boolean(60)
                ? json_encode([$faker->imageUrl(), $faker->imageUrl()])
                : null,
            'media_id' => MediaFactory::new(),
            'sort_order' => $faker->numberBetween(0, 10),
        ];
    }

}
