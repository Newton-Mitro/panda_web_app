<?php

namespace Database\Factories;

use App\Infrastructure\Models\GalleryMedia;
use Illuminate\Database\Eloquent\Factories\Factory;

class GalleryMediaFactory extends Factory
{
    protected $model = GalleryMedia::class;
    public function definition(): array
    {
        return [
            'caption' => $this->faker->sentence(5),
            'description' => $this->faker->paragraph(10, true),
            'media_id' => null,
            'gallery_id' => null,
        ];
    }
}
