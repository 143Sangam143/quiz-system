<?php

namespace App\Models;

use App\Traits\HasModelAttribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory, HasModelAttribute;
    protected $guard_name = 'admin';

    protected $fillable = ['name','admin_id','uri','is_active'];

    public function scopeActive($query){
        return $query->where('is_active', '1');
    }

    public function getRouteKeyName(){
        return 'uri';
    }

    public function questions(){
        return $this->hasMany(Question::class);
    }

    public function quizzes()
    {
        return $this->belongsToMany(Quiz::class, 'quiz_categories');
    }
}
