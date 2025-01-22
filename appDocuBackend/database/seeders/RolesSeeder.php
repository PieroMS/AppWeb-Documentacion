<?php

namespace Database\Seeders;

use App\Models\Rols;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            ['name' => 'admin', 'description' => 'No modificar'],
            ['name' => 'developer', 'description' => 'No modificar'],
        ];

        foreach ($roles as $role) {
            Rols::create($role);
        }
    }
}
