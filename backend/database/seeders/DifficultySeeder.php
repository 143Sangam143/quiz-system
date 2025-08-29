<?php

namespace Database\Seeders;

use App\Models\Difficulty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DifficultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $difficulties = [
            [
                'admin_id' => 3,
                'name' => 'Beginner',
                'uri' => 'beginner',
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'admin_id' => 3,
                'name' => 'Intermediate',
                'uri' => 'intermediate',
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'admin_id' => 3,
                'name' => 'Advanced',
                'uri' => 'advanced',
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'admin_id' => 3,
                'name' => 'Expert',
                'uri' => 'expert',
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        Difficulty::insert($difficulties);
    }
}
