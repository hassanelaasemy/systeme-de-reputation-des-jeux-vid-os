<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests,DispatchesJobs ,ValidatesRequests;

    protected function displayMessage($message ,$status =422,$messageLabel='message')
    {
        return response()->json([
            $messageLabel=>$message,
        ],$status);
    }
}
