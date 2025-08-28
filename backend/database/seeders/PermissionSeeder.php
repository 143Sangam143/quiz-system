<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Spatie\Permission\Models\Permission;
use App\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            [
                "name" => "admins_index",
            ],
            [
                "name" => "admins_show",
            ],
            [
                "name" => "admins_create",
            ],
            [
                "name" => "admins_edit",
            ],
            [
                "name" => "admins_delete",
            ],
            [
                "name" => "roles_index",
            ],
            [
                "name" => "roles_show",
            ],
            [
                "name" => "roles_create",
            ],
            [
                "name" => "roles_edit",
            ],
            [
                "name" => "roles_delete",
            ],
            [
                "name" => "permissions_index",
            ],
            [
                "name" => "permissions_show",
            ],
            [
                "name" => "permissions_create",
            ],
            [
                "name" => "permissions_edit",
            ],
            [
                "name" => "permissions_delete",
            ],
            [
                "name" => "categories_index",
            ],
            [
                "name" => "categories_show",
            ],
            [
                "name" => "categories_create",
            ],
            [
                "name" => "categories_edit",
            ],
            [
                "name" => "categories_delete",
            ],
            [
                "name" => "difficulties_index",
            ],
            [
                "name" => "difficulties_show",
            ],
            [
                "name" => "difficulties_create",
            ],
            [
                "name" => "difficulties_edit",
            ],
            [
                "name" => "difficulties_delete",
            ],
            [
                "name" => "questions_index",
            ],
            [
                "name" => "questions_show",
            ],
            [
                "name" => "questions_create",
            ],
            [
                "name" => "questions_edit",
            ],
            [
                "name" => "questions_delete",
            ],
            [
                "name" => "answers_index",
            ],
            [
                "name" => "answers_show",
            ],
            [
                "name" => "answers_create",
            ],
            [
                "name" => "answers_edit",
            ],
            [
                "name" => "answers_delete",
            ],
            [
                "name" => "roles_and_permissions",
            ]
        ];
        foreach ($permissions as &$permission) {
            $permission['guard_name'] = 'admin';
            $permission['created_at'] = Carbon::now();
            $permission['updated_at'] = Carbon::now();
        }

        Permission::insert($permissions);

        $permissionIds = Permission::pluck('id', 'name');

        Role::where('name','!=','ultra_admin')->get()->each(function ($role) use ($permissionIds) {
            foreach ($permissionIds as $name => $id) {
                // Assign permissions using Spatie's built-in method
                $role->givePermissionTo($name);
            }
        });
    }
}
