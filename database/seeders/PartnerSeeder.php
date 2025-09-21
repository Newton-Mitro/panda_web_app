<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Partner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Partner::factory(4)->create(
            [
                'media_id' => Media::inRandomOrder()->first()->id,
            ]
        );
    }
}
