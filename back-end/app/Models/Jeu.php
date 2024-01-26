<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jeu extends Model
{
    use HasFactory;
    protected $fillable=[
        'nom_jeu',
        'image',
        'developpeur',
        'description',
        'mots_cles',
        'senario',
        'indications',
        'situation',
        'id',
        'id_platform',
        'id_categorie'
    ];
    protected $with=['platform','categorie'];
    public function platform()
    {
        return $this->belongsTo(Platform::class,'id_platform','id_platform');
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class,'id_categorie','id_categorie');
    }
}
