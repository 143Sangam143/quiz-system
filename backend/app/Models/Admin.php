<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticatable
{
    use HasFactory, HasRoles;

    protected $guard_name = 'admin';
    protected $fillable = [
        'name',
        'parent_id',
        'email',
        'password',
        'pin',
        'phone',
        'image'
    ];
}
