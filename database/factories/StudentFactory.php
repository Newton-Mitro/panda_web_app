<?php

namespace Database\Factories;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition(): array
    {
        $genders = ['MALE', 'FEMALE', 'OTHER'];
        $religions = ['ISLAM', 'HINDUISM', 'CHRISTIANITY', 'BUDDHISM', 'OTHER'];

        return [
            'media_id' => null,
            'student_id' => strtoupper(Str::random(10)),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->unique()->phoneNumber(),
            'date_of_birth' => $this->faker->date('Y-m-d', '-18 years'),
            'gender' => $this->faker->randomElement($genders),
            'religion' => $this->faker->randomElement($religions),
            'guardian_name' => $this->faker->name(),
            'guardian_phone' => $this->faker->phoneNumber(),
            'roll_number' => strtoupper(Str::random(6)),
            'category_id' => null,
            'birth_registration_no' => $this->faker->numerify('##########'),
            'national_id_no' => $this->faker->numerify('##########'),
            'address' => $this->faker->address(),
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}
