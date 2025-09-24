<?php

namespace Database\Factories;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeamFactory extends Factory
{
    protected $model = Team::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'designation' => $this->faker->jobTitle(),
            'bio' => $this->faker->paragraph(6),
            'message' => $this->faker->sentence(),
            'department' => $this->faker->word(),
            'media_id' => null,

            'facebook_links' => 'https://facebook.com/' . $this->faker->userName(),
            'twitter_links' => 'https://twitter.com/' . $this->faker->userName(),
            'linkedin_links' => 'https://linkedin.com/in/' . $this->faker->userName(),
            'instagram_links' => 'https://instagram.com/' . $this->faker->userName(),
            'youtube_links' => 'https://youtube.com/' . $this->faker->userName(),
            'whatsapp_links' => 'https://wa.me/' . $this->faker->phoneNumber(),
            'github_links' => 'https://github.com/' . $this->faker->userName(),

            'email' => $this->faker->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),

            'category_id' => null,

            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}
