<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\Category;
use App\Models\Difficulty;
use App\Models\Question;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        $this->call(AdminSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(RolesAndPermissionSeeder::class);

        $this->call(UserSeeder::class);

        Category::factory(4)->create();
        $this->call(DifficultySeeder::class);
        Question::factory(16)->create()->each(function ($question) {
            Answer::factory(4)->create(['question_id' => $question->id]);
        });

        $this->call(QuizSeeder::class);
        $this->call(QuizCategorySeeder::class);
        $this->call(QuizQuestionSeeder::class);
        $this->call(QuizAttemptSeeder::class);

    }
}
