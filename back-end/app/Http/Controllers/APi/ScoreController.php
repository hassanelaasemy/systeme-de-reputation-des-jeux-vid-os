<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use App\Http\Resources\ScoreCollection;
use App\Models\Score;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new ScoreCollection(Score::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'score'=>'required'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'There are some fialds that are required!',
                'errors'=>$validator->errors()
            ]);
        }

        $score=Score::create($request->all());
        return response()->json([
            'data'=>$score,
            'message'=>'Successfully added the score.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Score $score)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Score $score)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Score $score)
    {
        //
    }
}
