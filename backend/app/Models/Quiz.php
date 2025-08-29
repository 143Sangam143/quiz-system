<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = [
        'title','uri','time','is_active','difficulty_id','admin_id'];

    protected $appends = ['total_attempts','total_players','highest_score'];

    public function getTotalAttemptsAttribute()
    {
        return $this->attempts()->sum('attempt_number'); 
    }
    public function getHighestScoreAttribute()
    {
        return $this->attempts()->max('score'); 
    }
    public function getTotalPlayersAttribute()
    {
        return $this->attempts()->distinct('user_id')->count('user_id');
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'quizzes_categories');
    }

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }
    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
    public function difficulty()
    {
        return $this->belongsTo(Difficulty::class);
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'quizzes_questions');
    }

    public function getRouteKeyName(){
        return 'uri';
    }
}
