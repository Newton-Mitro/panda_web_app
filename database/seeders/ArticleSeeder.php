<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        Article::factory(12)->create();
    }
}
