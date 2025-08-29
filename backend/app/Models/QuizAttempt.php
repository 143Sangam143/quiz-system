<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    protected $table = 'quizzes_attempts';
    protected $fillable = [
        'quiz_id',
        'user_id',
        'finished_at',
        'started_at',
        'score',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function user()
    {
        return $this->belongsTo(Admin::class);
    }
}
