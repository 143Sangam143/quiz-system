<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizAttemptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('quizzes_attempts')->insert([
            ['quiz_id' => 1, 'user_id' => 1, 'score' => 80, 'attempt_number' => 1, 'started_at' => now(), 'finished_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 1, 'user_id' => 2, 'score' => 70, 'attempt_number' => 1, 'started_at' => now(), 'finished_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 1, 'user_id' => 3, 'score' => 90, 'attempt_number' => 1, 'started_at' => now(), 'finished_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 2, 'user_id' => 1, 'score' => 60, 'attempt_number' => 1, 'started_at' => now(), 'finished_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 2, 'user_id' => 2, 'score' => 75, 'attempt_number' => 1, 'started_at' => now(), 'finished_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 3, 'user_id' => 3, 'score' => 85, 'attempt_number' => 1, 'started_at' => now(), 'finished_at' => now(), 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
