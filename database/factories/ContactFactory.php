<?php

namespace Database\Factories;

use App\Infrastructure\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    protected $model = Contact::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->company(),
            'address' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->companyEmail(),
            'opening_hours' => $this->faker->randomElement([
                'Mon-Fri: 9 AM - 6 PM',
                'Mon-Sat: 10 AM - 8 PM',
                '24/7 Service',
            ]),
            // Latitude & Longitude restricted to Bangladesh
            'latitude' => $this->faker->latitude(20.5, 26.5),
            'longitude' => $this->faker->longitude(88, 92.5),
        ];
    }
}
