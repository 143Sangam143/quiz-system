<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $guard_name = 'admin';

    protected $fillable = ['admin_id','category_id','difficulty_id','question_text','uri','is_active','answer_explanation'];
}
