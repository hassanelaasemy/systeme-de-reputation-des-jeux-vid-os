<?php

use App\Http\Controllers\APi\CommentaireController;
use App\Http\Controllers\APi\JeuxController;
use App\Http\Controllers\APi\LoginController;
use App\Http\Controllers\APi\LogoutController;
use App\Http\Controllers\APi\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [LogoutController::class, 'index']);
});
Route::apiResource('/users', UserController::class);

Route::post('/login', [LoginController::class, 'index']);

//Route::apiResource('/jeux', JeuxController::class);
Route::post('/jeux',[JeuxController::class,'store']);
Route::get('/jeux',[JeuxController::class,'index']);
Route::patch('/jeux/{id_jeu}',[JeuxController::class,'updateSituation']);
Route::get('/jeux/{id_jeu}',[JeuxController::class,'show']);

Route::apiResource('/commentaire', CommentaireController::class);

Route::apiResource('/note', \App\Http\Controllers\APi\NoteController::class);

Route::apiResource('/score', \App\Http\Controllers\APi\ScoreController::class);

Route::apiResource('/platform', \App\Http\Controllers\APi\PlatformController::class);

Route::apiResource('/categorie', \App\Http\Controllers\APi\CategorieController::class);
