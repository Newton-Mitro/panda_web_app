<?php

namespace Database\Factories;

use App\Infrastructure\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        $isUserComment = $this->faker->boolean(70); // 70% chance comment is from a user

        return [
            'article_id' => null,
            'user_id' => null,
            'author_name' => $isUserComment ? null : $this->faker->name(),
            'author_email' => $isUserComment ? null : $this->faker->safeEmail(),
            'content' => $this->faker->paragraphs(2, true),
            'status' => $this->faker->randomElement(['pending', 'approved', 'spam']),
        ];
    }
}
