<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        Testimonial::factory(11)->create(
            [
                'media_id' => Media::inRandomOrder()->first()->id,
            ]
        );
    }
}
