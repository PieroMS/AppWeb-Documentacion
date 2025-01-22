<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('endpoints', function (Blueprint $table) {
            $table->id();
            $table->string('dir_controller', 100);
            $table->string('endpoint_name', 100);
            $table->string('url', 255);
            $table->string('procedure', 100)->nullable();
            $table->string('bruno_data', 100);
            $table->integer('request_id');
            $table->string('description', 255);
            $table->integer('progress_id');
            $table->integer('user_id');
            $table->integer('project_id');
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
        Schema::dropIfExists('endpoints');
    }
};
