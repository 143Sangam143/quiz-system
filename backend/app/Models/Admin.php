<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasFactory, HasRoles, HasApiTokens;

    protected $table = 'admins';
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

    protected $appends = ['user_role'];

    public function getUserRoleAttribute(){
        return $this->roles()->first()?->name;
    }

    public function quizAttempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }
}
