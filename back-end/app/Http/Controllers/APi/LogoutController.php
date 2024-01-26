<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    /**
     * Index
     *
     * @param mixed $request
     * @return void
     */

    public function index(Request $request)
    {
        // Simply delete the token from the databse
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message'=>'You have successfully logged out!',
        ]);
    }
}
