<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Difficulty extends Model
{
    use HasFactory;
    protected $guard_name = 'admin';

    protected $fillable = ['admin_id','name','uri','is_active'];

    public function scopeActive($query){
        return $query->where('is_active', '1');
    }

    public function getRouteKeyName(){
        return 'uri';
    }

    public function question(){
        return $this->hasMany(Question::class);
    }

}
