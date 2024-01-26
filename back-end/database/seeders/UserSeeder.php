<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert(
            [
                'user_name'=>'youssef',
                'email'=>'youssef@gmail.com',
                'password'=>Hash::make('youssef123'),
                'role'=>'admin'
            ],
//            [
//                'name'=>'hamza',
//                'email'=>'hamza@gmail.com',
//                'password'=>Hash::make('hamza123'),
//                'role'=>'utilisateur'
//            ],
//            [
//                'name'=>'yacer',
//                'email'=>'yacer@gmail.com',
//                'password'=>Hash::make('yacer123'),
//                'role'=>'admin'
//            ],
//            [
//                'user_name'=>'ali',
//                'email'=>'ali@gmail.com',
//                'password'=>Hash::make('ali123'),
//                'role'=>'admin'
//            ],
        );
    }
}
