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
            $table->foreignId('ClassIndexId')->nullable()->constrained('class_indices');
            $table->tinyInteger('sem')->default(4);
            $table->string('des',200)->nullable();
            $table->boolean('del')->default(0);
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
