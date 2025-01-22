<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\Rols;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $adminRole = Rols::where('name', 'admin')->first();
        $backendArea = Area::where('name', 'Backend')->first();

        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin100@devdatep.com',
                'password' => bcrypt('admin'),
                'status' => '1',
                'rol_id' => $adminRole->id,
                'area_id' => $backendArea->id,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
