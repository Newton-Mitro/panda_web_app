<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Career;
use App\Infrastructure\Models\JobApplication;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\User;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder
{
    public function run(): void
    {
        $allUsers = User::all();
        $allMedia = Media::all();

        if ($allUsers->isEmpty()) {
            $this->command->warn('⚠️ No users found. Skipping CareerSeeder.');
            return;
        }

        if ($allMedia->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping CareerSeeder.');
            return;
        }

        // Create 5 careers
        Career::factory(5)->create([
            'created_by' => $allUsers->random()->id,
            'updated_by' => $allUsers->random()->id,
        ])->each(function ($career) use ($allUsers, $allMedia) {

            $applicationsCount = rand(3, 7);
            for ($i = 0; $i < $applicationsCount; $i++) {
                JobApplication::factory()->create([
                    'career_id' => $career->id,
                    'resume_path' => $allMedia->random()->file_path,
                    'cover_letter_path' => $allMedia->random()->file_path,
                ]);
            }
        });

        $this->command->info("✅ Careers and associated Job Applications seeded.");
    }
}
