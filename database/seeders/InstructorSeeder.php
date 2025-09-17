<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Instructor;
use Illuminate\Database\Seeder;

class InstructorSeeder extends Seeder
{
    public function run(): void
    {
        // Create 20 random instructors
        Instructor::factory()->count(6)->create();

        // Optionally create a few predefined instructors
        Instructor::factory()->create([
            'instructor_id' => 'INST-1001',
            'name' => 'Dr. Jane Doe',
            'email' => 'jane.doe@example.com',
            'designation' => 'Assistant Professor',
            'department' => 'Computer Science',
            'gender' => 'FEMALE',
            'religion' => 'CHRISTIANITY',
            'status' => 'Active',
        ]);
    }
}
