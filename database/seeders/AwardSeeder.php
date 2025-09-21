<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Award;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class AwardSeeder extends Seeder
{
    public function run(): void
    {
        Award::factory(5)->create(
            [
                'media_id' => Media::inRandomOrder()->first()->id,
            ]
        );
    }
}
