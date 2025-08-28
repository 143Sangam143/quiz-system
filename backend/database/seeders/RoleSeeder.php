<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'ultra_admin',
                'display_name' => 'Ultra Admin',
                'admin_id' => '1',
                "guard_name"=> "admin",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'hierarchy' => 1
            ],
            [
                'name' => 'super_admin',
                'display_name' => 'Super Admin',
                'admin_id' => '1',
                "guard_name"=> "admin",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'hierarchy' => 2
            ],
            [
                'name' => 'admin',
                'display_name' => 'Admin',
                'admin_id' => '2',
                "guard_name"=> "admin",
                'created_at'=> Carbon::now(),
                'updated_at'=> Carbon::now(),
                'hierarchy' => 3
            ],
            [
                'name' => 'user',
                'display_name' => 'User',
                'admin_id' => '3',
                "guard_name"=> "admin",
                'created_at'=> Carbon::now(),
                'updated_at'=> Carbon::now(),
                'hierarchy' => 4
            ],
        ];
        Role::insert($roles);
        $super_admin_role  = Role::where('name', 'super_admin')->first();
        $super_admin_role ->givePermissionTo(Permission::all());
        $ultra_admin_role  = Role::where('name', 'ultra_admin')->first();
        $ultra_admin_role ->givePermissionTo(Permission::all());
    }
}
