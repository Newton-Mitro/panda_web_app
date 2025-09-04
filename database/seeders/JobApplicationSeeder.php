<?php

namespace Database\Seeders;

use App\Infrastructure\Models\JobApplication;
use Illuminate\Database\Seeder;

class JobApplicationSeeder extends Seeder
{
    public function run(): void
    {
        JobApplication::factory(10)->create();
    }
}
