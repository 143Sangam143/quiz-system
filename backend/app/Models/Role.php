<?php

namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    protected $guard_name = 'admin';

    protected $fillable = [
        'name',
        'display_name',
        'description',
        'icon',
        'icon_gradient',
        'admin_id',
        'guard_name',
        'hierarchy'
    ];
}
