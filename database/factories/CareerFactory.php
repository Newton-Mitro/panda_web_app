<?php

namespace Database\Factories;

use App\Infrastructure\Models\Career;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CareerFactory extends Factory
{
    protected $model = Career::class;

    public function definition(): array
    {
        $title = $this->faker->jobTitle();

        // Salary
        $minSalary = $this->faker->numberBetween(30000, 80000);
        $maxSalary = $minSalary + $this->faker->numberBetween(5000, 40000);

        return [
            // Basic Info
            'title' => $title,
            'slug' => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(100, 999),
            'description' => $this->faker->paragraphs(3, true),
            'requirements' => $this->faker->paragraphs(4, true),
            'responsibilities' => $this->faker->paragraphs(3, true),
            'location' => $this->faker->city(),
            'is_remote' => $this->faker->boolean(30), // 30% chance remote

            // Salary & Benefits
            'salary_range' => '$' . number_format($minSalary) . ' - $' . number_format($maxSalary),
            'min_salary' => $minSalary,
            'max_salary' => $maxSalary,
            'currency' => 'USD',
            'benefits' => json_encode($this->faker->randomElements([
                'Health Insurance',
                '401k',
                'Paid Time Off',
                'Remote Work',
                'Gym Membership',
                'Stock Options',
                'Flexible Hours',
            ], $this->faker->numberBetween(2, 5))),

            // Job Details
            'employment_type' => $this->faker->randomElement([
                'full-time',
                'part-time',
                'contract',
                'internship',
                'temporary'
            ]),
            'experience_level' => $this->faker->randomElement([
                'entry',
                'junior',
                'mid',
                'senior',
                'lead'
            ]),
            'department' => $this->faker->randomElement([
                'Engineering',
                'Marketing',
                'Human Resources',
                'Finance',
                'Customer Support',
                'Design'
            ]),
            'job_function' => $title,
            'education_level' => $this->faker->randomElement([
                "Bachelor's",
                "Master's",
                "PhD",
                "Diploma",
                "High School"
            ]),

            // Application Workflow
            'deadline' => ($date = $this->faker->dateTimeBetween('now', '+6 months'))
                ? $date->format('Y-m-d')
                : null,
            'status' => $this->faker->randomElement(['open', 'closed', 'draft']),
            'positions' => $this->faker->numberBetween(1, 5),
            'applications_count' => 0, // starts at 0

            // Meta
            'created_by' => null,
            'updated_by' => null,
        ];
    }
}
