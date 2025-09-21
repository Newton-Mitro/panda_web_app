<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Instructor;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class InstructorSeeder extends Seeder
{
    public function run(): void
    {
        Instructor::factory(9)->create(
            [
                'media_id' => Media::inRandomOrder()->first()->id
            ]
        );
    }
}
