<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JeuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jeus')->insert(
            [
                "nom_jeu" => "Call of Duty: Modern Warfare",
                "image"=>"Image.png",
                "type_jeu" => "Jeu de tir à la première personne",
                "developpeur" => "Infinity Ward",
                "description" => "Call of Duty: Modern Warfare est un jeu de tir à la première personne qui se déroule dans un environnement de guerre moderne. Les joueurs incarnent des soldats et participent à des missions de combat intenses",
                "mots_cles" => "Call of Duty, Modern Warfare, jeu de tir",
                "senario" => "Les joueurs jouent le rôle de soldats qui participent à des missions dans différents pays pour arrêter des terroristes",
                "indications" => "1 joueur en mode histoire, multijoueur en ligne jusqu'à 20 joueurs, âge recommandé : 18 ans et plus",
                "id"=>1
            ]
        );
    }
}
