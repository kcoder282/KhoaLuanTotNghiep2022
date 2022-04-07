<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInfoAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('info_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('courseId')->constrained('courses');
            $table->foreignId('classNameId')->constrained('class_names');
            $table->foreignId('leactuerId')->constrained('lecturers');
            $table->string('assignment')->nullable();
            $table->string('request')->nullable();
            $table->string('note')->nullable();
            $table->integer('classSize')->nullable();
            $table->tinyInteger('theory')->nullable();
            $table->tinyInteger('practice')->nullable();
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
        Schema::dropIfExists('info_assignments');
    }
}
