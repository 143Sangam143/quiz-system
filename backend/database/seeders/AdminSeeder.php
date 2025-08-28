<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        $ultraAdmin = Admin::create([
            'name' => 'Sangam Katwal',
            'email' => 'katwalsangam@gmail.com',
            'email_verified_at' => $now,
            'password' => '$2y$12$nxq5aps9AasOI71MK4jy0.KomQSXGepyeEpGCfzVaUkKgTfLBKy0u',
            'pin' => 1213,
            'active' => 1,
            'created_at' => $now,
            'updated_at' => $now,
            'parent_id' => 0,
        ]);

        $admins = [
            [
                'name' => 'Super Admin User',
                'email' => 'super_admin@gmail.com',
                'role' => 'super_admin',
                'parent_id' => 1,
            ],
            [
                'name' => 'Admin User',
                'email' => 'admin@gmail.com',
                'role' => 'admin',
                'parent_id' => 2,
            ],
            [
                'name' => 'User 1',
                'email' => 'user1@gmail.com',
                'role' => 'user',
                'parent_id' => 3,
            ],
            [
                'name' => 'User 2',
                'email' => 'user2@gmail.com',
                'role' => 'user',
                'parent_id' => 3,
            ],
            [
                'name' => 'User 3',
                'email' => 'user3@gmail.com',
                'role' => 'user',
                'parent_id' => 3,
            ],
        ];
        
        foreach ($admins as $adminData) {
            $admin = Admin::create([
                'name' => $adminData['name'],
                'parent_id' => $adminData['parent_id'],
                'email' => $adminData['email'],
                'email_verified_at' => $now,
                'password' => Hash::make('admin@admin'),
                'pin' => 1213,
                'active' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
            $admin->assignRole($adminData['role']);
        }
    }
}
