<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('code', 8);
            $table->string('name', 100);
            $table->tinyInteger('credits');
            $table->tinyInteger('theory');
            $table->tinyInteger('practice');
            $table->tinyInteger('sem')->nullable();
            $table->tinyInteger('semReal')->nullable();
            $table->boolean('delete')->default(false);
            $table->boolean('store')->default(true);
            $table->boolean('computer')->default(false);
            $table->foreignId('prerequisite')->nullable()->constrained('courses');
            $table->foreignId('learnFirst')->nullable()->constrained('courses');
            $table->foreignId('parallel')->nullable()->constrained('courses');
            $table->foreignId('groupCourseId')->nullable()->constrained('group_courses');
            $table->foreignId('ClassIndexId')->nullable()->constrained('class_indices');
            $table->foreignId('coursesType')->nullable()->constrained('courses_types');
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
        Schema::dropIfExists('courses');
    }
}
