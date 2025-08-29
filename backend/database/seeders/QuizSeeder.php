<?php

namespace Database\Seeders;

use App\Models\Quiz;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quizzes = [
            [
                'admin_id' => 1,
                'difficulty_id' => 1,
                'title' => 'Basic Mathematics Quiz',
                'uri' => Str::slug('Basic Mathematics Quiz'),
                'time' => 30, // 30 minutes
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'admin_id' => 2,
                'difficulty_id' => 2,
                'title' => 'General Knowledge Quiz',
                'uri' => Str::slug('General Knowledge Quiz'),
                'time' => 45, // 45 minutes
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'admin_id' => 1,
                'difficulty_id' => 3,
                'title' => 'Science Trivia',
                'uri' => Str::slug('Science Trivia'),
                'time' => 60, // 60 minutes
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Quiz::insert($quizzes);
    }
}
