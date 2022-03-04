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
        for($i=1;$i<=4;$i++)
            for($j=1;$j<=3;$j++){
                $d = new Semester();
                $d->schoolYear = $i;
                $d->schoolYearIndex = $j;
                $d->save();
            }
    }
}
