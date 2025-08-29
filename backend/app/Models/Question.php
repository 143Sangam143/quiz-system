<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $guard_name = 'admin';

    protected $fillable = ['admin_id','category_id','difficulty_id','question_text','uri','is_active','answer_explanation'];

    public function scopeActive($query){
        return $query->where('is_active', '1');
    }

    public function getRouteKeyName(){
        return 'uri';
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function difficulty(){
        return $this->belongsTo(Difficulty::class);
    }

    public function answers(){
        return $this->hasMany(Answer::class);
    }
}
