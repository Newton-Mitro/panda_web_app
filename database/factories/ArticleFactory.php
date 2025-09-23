<?php

namespace Database\Factories;

use App\Infrastructure\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(6);

        return [
            'user_id' => null,
            'title' => $title,
            'slug' => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(100, 999),
            'content' => $this->faker->paragraphs(5, true),
            'media_id' => null,
            'category_id' => null,
            'status' => $this->faker->randomElement(['Draft', 'Published', 'Archived']),
            'published_at' => $this->faker->optional()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
