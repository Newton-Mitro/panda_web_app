<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::factory(8)->create();
    }
}
