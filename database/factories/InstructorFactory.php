<?php

namespace Database\Factories;

use App\Infrastructure\Models\Instructor;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class InstructorFactory extends Factory
{
    protected $model = Instructor::class;

    public function definition(): array
    {
        $genders = ['MALE', 'FEMALE', 'OTHER'];
        $religions = ['ISLAM', 'HINDUISM', 'CHRISTIANITY', 'BUDDHISM', 'OTHER'];

        return [
            'media_id' => MediaFactory::new(),
            'instructor_id' => strtoupper(Str::random(8)),
            'name' => $this->faker->name(),
            'bio' => $this->faker->sentence(10),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->unique()->phoneNumber(),
            'date_of_birth' => $this->faker->optional()->date('Y-m-d', '-25 years'),
            'gender' => $this->faker->optional()->randomElement($genders),
            'designation' => $this->faker->optional()->jobTitle(),
            'department' => $this->faker->optional()->randomElement(['Mathematics', 'Physics', 'Chemistry', 'Computer Science']),
            'national_id_no' => $this->faker->optional()->numerify('##########'),
            'religion' => $this->faker->optional()->randomElement($religions),
            'address' => $this->faker->optional()->address(),
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}
