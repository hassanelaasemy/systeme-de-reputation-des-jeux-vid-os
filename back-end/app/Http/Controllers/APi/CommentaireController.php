<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentaireCollection;
use App\Models\Commentaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new CommentaireCollection(Commentaire::query()->orderByDesc('id_commentaire')->paginate(5));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatore=Validator::make($request->all(),[
            'commentaire'=>'required',
        ]);

        if ($validatore->fails()){
            return response()->json([
                'message'=>'There are some fialds that are required!',
                'errors'=>$validatore->errors()
            ],422);
        }

        $commentaire=Commentaire::create($request->all());
        return response()->json([
            'data'=>$commentaire,
            'message'=>'Successfully added the commentaire.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id_commentaire)
    {
        $commentaire = Commentaire::where('id_commentaire', $id_commentaire)->first();
        if ($commentaire) {
            return response()->json($commentaire);
        } else {
            return response()->json(['message' => 'Commrntaire not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
