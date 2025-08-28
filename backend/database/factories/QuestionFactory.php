<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Difficulty;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'admin_id' => 3,
            'category_id' => Category::factory(),
            'difficulty_id' => Difficulty::all()->random()->id,
            'question_text' => $this->faker->sentence(),
            'uri' => $this->faker->unique()->slug(),
            'is_active' => true,
            'answer_explanation' => $this->faker->paragraph(),
        ];
    }
}
