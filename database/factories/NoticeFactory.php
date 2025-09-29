<?php

namespace Database\Factories;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Notice;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class NoticeFactory extends Factory
{
    protected $model = Notice::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(4);

        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(100, 999),
            'content' => $this->faker->paragraph(8),
            'publish_date' => $this->faker->dateTimeBetween('-1 years', 'now')->format('Y-m-d'),
            'expiry_date' => $this->faker->dateTimeBetween('now', '+6 months')->format('Y-m-d'),
            'media_id' => null,
            'category_id' => null,
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}
