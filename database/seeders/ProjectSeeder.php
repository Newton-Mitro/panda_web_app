<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::factory(5)->create();
    }
}
