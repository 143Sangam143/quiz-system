<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $guard_name = 'admin';

    protected $fillable = ['name','admin_id','uri','is_active'];
}
