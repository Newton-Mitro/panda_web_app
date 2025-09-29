<?php

namespace Database\Factories;

use App\Infrastructure\Models\HeroSlider;
use Illuminate\Database\Eloquent\Factories\Factory;

class HeroSliderFactory extends Factory
{
    protected $model = HeroSlider::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4),
            'subtitle' => $this->faker->sentence(6),
            'button_text' => $this->faker->word(),
            'button_link' => $this->faker->url(),
            'media_id' => null,
            'sort_order' => $this->faker->numberBetween(0, 10),
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}
