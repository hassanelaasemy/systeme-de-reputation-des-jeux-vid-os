<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id('id_note');
            $table->float('note');
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('id_jeu');
            $table->foreign('id')->references('id')->on('users');
            $table->foreign('id_jeu')->references('id_jeu')->on('jeus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
