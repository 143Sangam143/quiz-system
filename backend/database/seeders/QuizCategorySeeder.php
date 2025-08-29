<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('quizzes_categories')->insert([
            ['quiz_id' => 1, 'category_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 1, 'category_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 2, 'category_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 2, 'category_id' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 3, 'category_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['quiz_id' => 3, 'category_id' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
