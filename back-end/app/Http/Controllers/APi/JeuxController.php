<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use App\Http\Resources\JeuCollection;
use App\Models\Jeu;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class JeuxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jeux= Jeu::query()->orderByDesc('id_jeu')->paginate(5);
        return response()->json([
            'data'=>$jeux
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Create the validator
        $validator = Validator::make($request->all(), [
            'nom_jeu' => 'required',
            'image' => 'required|image|mimes:png,jpg,svg,jpeg',
            'developpeur' => 'required',
            'description' => 'required',
            'mots_cles' => 'required',
            'senario' => 'required',
            'indications' => 'required',
            'id_platform'=>'required',
            'id_categorie'=>'required'
        ]);

//        $validator['image']=$request->file('image')->store('jeux','public');

        // block or catch any validation failure if there are any
        if ($validator->fails()) {
            return response()->json([
                'message' => 'There are some fialds that are required!',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $filename;
            $file->move('images/', $fileName);
        }

        $requestData = array_merge($request->all(), [
            'image' => 'images/' . $fileName
        ]);


        $jeu = Jeu::create($requestData);

        return response()->json([
            'data' => $jeu,
            'message' => 'Successfully added the jeu.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id_jeu)
    {
        $jeu = Jeu::where('id_jeu', $id_jeu)->first();
        if ($jeu) {
            return response()->json($jeu);
        } else {
            return response()->json(['message' => 'Jeu not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function updateSituation(Request $request, $id_jeu)
    {
        $requestData = [];
        if (!empty($request->situation)) {
            $requestData['situation'] = $request->situation;
        }

        $data = tap(DB::table('jeus')->where('id_jeu', $id_jeu))
            ->update($requestData)
            ->first();
        dd($data);
        return response()->json([
            'data' => $data,
            'message' => 'Jeu updated successfully'
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
