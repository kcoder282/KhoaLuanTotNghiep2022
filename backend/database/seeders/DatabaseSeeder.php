<?php

namespace Database\Seeders;

use App\Models\Semester;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        (new Semester(['schoolYear' => 1, 'semester' => 1]))->save();
        (new Semester(['schoolYear' => 1, 'semester' => 2]))->save();
        (new Semester(['schoolYear' => 1, 'semester' => 3]))->save();

        (new Semester(['schoolYear' => 2, 'semester' => 1]))->save();
        (new Semester(['schoolYear' => 2, 'semester' => 2]))->save();
        (new Semester(['schoolYear' => 2, 'semester' => 3]))->save();

        (new Semester(['schoolYear' => 3, 'semester' => 1]))->save();
        (new Semester(['schoolYear' => 3, 'semester' => 2]))->save();
        (new Semester(['schoolYear' => 3, 'semester' => 3]))->save();

        (new Semester(['schoolYear' => 4, 'semester' => 1]))->save();
        (new Semester(['schoolYear' => 4, 'semester' => 2]))->save();
        (new Semester(['schoolYear' => 4, 'semester' => 3]))->save();
    }
}
