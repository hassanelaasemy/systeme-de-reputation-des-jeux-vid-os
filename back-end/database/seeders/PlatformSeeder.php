<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('platforms')->insert(
            [
                ['platform' => 'PlayStation 5','created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['platform' => 'Xbox Series X/S','created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['platform' => 'Nintendo Switch','created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['platform' => 'PC','created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['platform' => 'PlayStation 4','created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
                ['platform' => 'Xbox One','created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),],
            ]
        );
    }
}
