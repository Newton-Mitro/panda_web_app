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
            'bio' => $this->faker->optional(0.7)->paragraphs(3, true),
            'message' => $this->faker->optional(0.6)->paragraphs(2, true),
            'media_id' => MediaFactory::new(),
            'facebook_links' => $this->faker->optional(0.5)->url(),
            'twitter_links' => $this->faker->optional(0.5)->url(),
            'linkedin_links' => $this->faker->optional(0.5)->url(),
            'instagram_links' => $this->faker->optional(0.5)->url(),
            'email' => $this->faker->optional(0.8)->safeEmail(),
            'phone' => $this->faker->optional(0.7)->phoneNumber(),
            'address' => $this->faker->optional(0.7)->address(),
            'category_id' => CategoryFactory::new(),
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}
