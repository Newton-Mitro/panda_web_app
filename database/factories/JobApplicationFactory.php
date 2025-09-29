<?php

namespace Database\Factories;

use App\Infrastructure\Models\JobApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobApplicationFactory extends Factory
{
    protected $model = JobApplication::class;

    public function definition(): array
    {
        $experienceLevels = ['Junior', 'Mid', 'Senior'];
        $statuses = ['pending', 'reviewed', 'shortlisted', 'interviewing', 'offered', 'hired', 'rejected'];
        $qualifications = ['High School', "Bachelor's", "Master's", 'PhD'];

        $availableFrom = $this->faker->optional()->dateTimeBetween('now', '+3 months');

        return [
            'career_id' => null,            // override in seeder
            'full_name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'linkedin_url' => $this->faker->url(),
            'portfolio_url' => $this->faker->url(),
            'resume_path' => null,           // override in seeder
            'cover_letter_path' => null,     // override in seeder
            'why_choose' => $this->faker->paragraph(),
            'highest_qualification' => $this->faker->randomElement($qualifications),
            'experience_level' => $this->faker->randomElement($experienceLevels),
            'expected_salary' => $this->faker->randomFloat(2, 30000, 150000),
            'available_from' => $availableFrom ? $availableFrom->format('Y-m-d') : null,
            'status' => $this->faker->randomElement($statuses),
            'applied_via' => $this->faker->randomElement(['LinkedIn', 'Referral', 'Website']),
            'ip_address' => $this->faker->ipv4(),
            'notes' => $this->faker->paragraph(),
        ];
    }
}
