<?php

namespace Database\Seeders;

use App\Infrastructure\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'super.admin@email.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);

        $this->call([
            SettingSeeder::class,
            IconMediaSeeder::class,
            ImageMediaSeeder::class,
            DocumentMediaSeeder::class,
            CategorySeeder::class,
                // PageSeeder::class,
            CustomPageSeeder::class,
            ServiceSeeder::class,
            ProjectSeeder::class,
            TeamSeeder::class,
            LeaderSeeder::class,
            InstructorSeeder::class,
            StudentSeeder::class,
            TestimonialSeeder::class,
            AwardSeeder::class,
            NoticeSeeder::class,
            EventSeeder::class,
            PartnerSeeder::class,
            CareerSeeder::class,
            ContactSeeder::class,
            ContactMessageSeeder::class,
            GallerySeeder::class,
            HeroSliderSeeder::class,
            ArticleSeeder::class,
        ]);
    }
}
