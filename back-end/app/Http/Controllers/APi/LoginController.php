<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function index(Request $request)
    {
        //Catch the error from validator
        $validator=Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'The data is invalid.',
                'errors'=>$validator->errors(),
            ],422);
        }


        $user=User::where('email',$request->email)->first();

        //check if password and email matches.
        if (!$user || !Hash::check($request->password,$user->password) ){
            return response()->json([
                'message'=>"L'email ou mot de passe ne correspond pas au compte utilisateur.",
            ],421);
        }

        //Return the access token if the cheking is successful
        return response()->json([
            'access_token'=>$user->createToken('api-token')->plainTextToken,
            'id'=>$user->id,
            'role'=>$user->role,
            'type'=>'bearer'
        ],200);

    }
}
