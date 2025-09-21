<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        Contact::factory(7)->create();
    }
}
