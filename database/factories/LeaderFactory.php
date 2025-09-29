<?php

namespace Database\Factories;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Leader;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeaderFactory extends Factory
{
    protected $model = Leader::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'designation' => $this->faker->jobTitle(),
            'bio' => $this->faker->paragraphs(5, true),
            'message' => $this->faker->paragraphs(6, true),
            'media_id' => null,
            'facebook_links' => $this->faker->url(),
            'twitter_links' => $this->faker->url(),
            'linkedin_links' => $this->faker->url(),
            'instagram_links' => $this->faker->url(),
            'email' => $this->faker->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'category_id' => null,
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}
