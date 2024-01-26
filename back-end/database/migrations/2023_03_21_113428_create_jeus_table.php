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
        Schema::create('jeus', function (Blueprint $table) {
            $table->id('id_jeu');
            $table->string('nom_jeu');
            $table->string('image',150);
//            $table->string('type_jeu');
            $table->string('developpeur');
            $table->text('description');
            $table->text('mots_cles');
            $table->text('senario');
            $table->text('indications');
            $table->enum('situation',['en attente','accepter','refuser'])->default('en attente');
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('id_platform');
            $table->unsignedBigInteger('id_categorie');
            $table->foreign('id')->references('id')->on('users');
            $table->foreign('id_platform')->references('id_platform')->on('platforms');
            $table->foreign('id_categorie')->references('id_categorie')->on('categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jeus');
    }
};
