<?php

namespace Database\Seeders;

use App\Infrastructure\Models\HeroSlider;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class HeroSliderSeeder extends Seeder
{
    public function run(): void
    {
        HeroSlider::factory(6)->create(
            [
                'media_id' => Media::inRandomOrder()->first()->id,
            ]
        );
    }
}
