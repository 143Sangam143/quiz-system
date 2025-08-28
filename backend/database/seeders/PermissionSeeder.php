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
                "name" => "category_index",
            ],
            [
                "name" => "category_show",
            ],
            [
                "name" => "category_create",
            ],
            [
                "name" => "category_edit",
            ],
            [
                "name" => "category_delete",
            ],
            [
                "name" => "difficulty_index",
            ],
            [
                "name" => "difficulty_show",
            ],
            [
                "name" => "difficulty_create",
            ],
            [
                "name" => "difficulty_edit",
            ],
            [
                "name" => "difficulty_delete",
            ],
            [
                "name" => "question_index",
            ],
            [
                "name" => "question_show",
            ],
            [
                "name" => "question_create",
            ],
            [
                "name" => "question_edit",
            ],
            [
                "name" => "question_delete",
            ],
            [
                "name" => "answer_index",
            ],
            [
                "name" => "answer_show",
            ],
            [
                "name" => "answer_create",
            ],
            [
                "name" => "answer_edit",
            ],
            [
                "name" => "answer_delete",
            ],
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
