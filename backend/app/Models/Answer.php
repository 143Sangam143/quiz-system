<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Answer extends Model
{
    use HasFactory;
    protected $guard_name = 'admin';

    protected $fillable = ['admin_id','question_id','answer_text','is_active'];
}
