<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Leader;
use Illuminate\Database\Seeder;

class LeaderSeeder extends Seeder
{
    public function run(): void
    {
        Leader::factory()->count(9)->create();
    }
}
