<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        Student::factory()->count(25)->create();
    }
}
