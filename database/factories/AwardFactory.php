<?php

namespace Database\Factories;

use App\Infrastructure\Models\Award;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

class AwardFactory extends Factory
{
    protected $model = Award::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'organization' => $this->faker->company(),
            'year' => $this->faker->year(),
            'description' => $this->faker->paragraphs(5, true),
            'media_id' => null,
        ];
    }
}
