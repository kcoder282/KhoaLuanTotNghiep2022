<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassIndicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('class_indices', function (Blueprint $table) {
            $table->id();
            $table->string('name',8);
            $table->year('beginYear');
            $table->year('endYear');
            $table->foreignId('srcClassIndex')->nullable()->constrained('class_indices');
            $table->string('des',200);
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
        Schema::dropIfExists('class_indices');
    }
}
