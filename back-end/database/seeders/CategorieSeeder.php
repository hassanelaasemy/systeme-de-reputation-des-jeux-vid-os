<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert(
            [
                [
                    'categorie' => 'Action',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],
                ['categorie' => 'Adventure', 'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['categorie' => 'Role-playing', 'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['categorie' => 'Strategy', 'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['categorie' => 'Sports', 'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['categorie' => 'Simulation', 'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['categorie' => 'Puzzle', 'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['categorie' => 'Horror', 'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
            ]
        );
    }
}
