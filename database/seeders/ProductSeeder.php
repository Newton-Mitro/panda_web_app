<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Product;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $allImages = Media::where('file_path', 'like', '%images%')->pluck('id');

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠ No media found containing "images" in file_path. Seed Media first!');
            return;
        }

        Product::factory(8)->create([
            'media_id' => function () use ($allImages) {
                return $allImages->random();
            },
        ]);
    }
}
