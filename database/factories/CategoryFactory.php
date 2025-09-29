<?php

namespace Database\Factories;

use App\Infrastructure\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);
        $slug = Str::slug($name);

        $categoryTypes = [
            'Team',
            'Course',
            'Leader',
            'Student',
            'Instructor',
            'Doctor',
            'Service',
            'Product',
            'Project',
            'Event',
            'Notice',
            'Article'
        ];

        return [
            'category_of' => $this->faker->randomElement($categoryTypes),
            'name' => $name,
            'slug' => $slug,
            'description' => $this->faker->paragraphs(5, true),
            'media_id' => null,
        ];
    }
}
