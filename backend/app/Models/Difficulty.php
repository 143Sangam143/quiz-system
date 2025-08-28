<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Difficulty extends Model
{
    use HasFactory;
    protected $guard_name = 'admin';

    protected $fillable = ['admin_id','name','is_active'];

}
