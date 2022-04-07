<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_courses', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('sumCredit');
            $table->boolean('store');
            $table->foreignId('ClassIndexId')->nullable()->constrained('class_indices');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_courses');
    }
}
