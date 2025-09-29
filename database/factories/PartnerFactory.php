<?php

namespace Database\Factories;

use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Partner;
use Illuminate\Database\Eloquent\Factories\Factory;

class PartnerFactory extends Factory
{
    protected $model = Partner::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'website' => $this->faker->url(),
            'media_id' => null,
        ];
    }
}
