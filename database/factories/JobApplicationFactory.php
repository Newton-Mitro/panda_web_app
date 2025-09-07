<?php

namespace Database\Factories;

use App\Infrastructure\Models\Career;
use App\Infrastructure\Models\JobApplication;
use App\Infrastructure\Models\Media;
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
            'career_id' => Career::inRandomOrder()->first()?->id,
            'full_name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'linkedin_url' => $this->faker->url(),
            'portfolio_url' => Media::inRandomOrder()->first()?->url,
            'resume_path' => Media::inRandomOrder()->first()?->file_path,
            'cover_letter_path' => Media::inRandomOrder()->first()?->file_path,
            'why_choose' => $this->faker->paragraph(),
            'highest_qualification' => $this->faker->randomElement($qualifications),
            'experience_level' => $this->faker->randomElement($experienceLevels),
            'expected_salary' => $this->faker->randomFloat(2, 30000, 150000),
            'available_from' => $availableFrom ? $availableFrom->format('Y-m-d') : null,
            'status' => $this->faker->randomElement($statuses),
            'applied_via' => $this->faker->randomElement(['LinkedIn', 'Referral', 'Website']),
            'ip_address' => $this->faker->ipv4(),
            'notes' => $this->faker->optional()->paragraph(),
        ];
    }
}
