<?php

namespace Database\Factories;

use App\Infrastructure\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class MediaFactory extends Factory
{
    protected $model = Media::class;

    public function definition(): array
    {
        // Pick a random extension and build a fake file name + path
        $extension = $this->faker->randomElement(['jpg', 'png', 'pdf', 'mp4']);
        $fileName = $this->faker->unique()->lexify('file_????') . '.' . $extension;

        return [
            'file_name' => $fileName,
            // Assuming symbolic link via `php artisan storage:link`
            'file_path' => "storage/uploads/{$fileName}",
            'file_type' => $extension, // or use MIME: "image/jpeg" etc.
            'alt_text' => $this->faker->sentence(),
            'uploaded_by' => null, // or use User::factory() if you have relationships
        ];
    }
}
