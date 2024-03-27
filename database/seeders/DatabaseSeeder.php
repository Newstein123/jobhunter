<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\CustomMail;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'minthetpaing',
            'email' => 'minthetpaing376@gmail.com',
            'password' => Hash::make('password')
        ]);
        $this->call([
            CustomMailSeeder::class,
            // EmployerSeeder::class,
            // ResumeSeeder::class
        ]);
    }
}
