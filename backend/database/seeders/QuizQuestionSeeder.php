<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('quizzes_questions')->insert([
            ['quiz_id' => 1, 'question_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 1, 'question_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 1, 'question_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 1, 'question_id' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 2, 'question_id' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 2, 'question_id' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 2, 'question_id' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 2, 'question_id' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 3, 'question_id' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 3, 'question_id' => 10, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 3, 'question_id' => 11, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 3, 'question_id' => 12, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 1, 'question_id' => 13, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 2, 'question_id' => 14, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 3, 'question_id' => 15, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 1, 'question_id' => 16, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
