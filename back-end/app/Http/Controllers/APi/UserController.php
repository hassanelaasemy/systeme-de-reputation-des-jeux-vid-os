<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new UserCollection(User::query()->orderByDesc('id')->paginate(5));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Create the validator
        $validator = Validator::make($request->all(), [
            'user_name' => 'required',
            'image' => 'required|image|mimes:png,jpg,svg,jpeg',
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required'
        ]);

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
            $file->move('images/users/', $fileName);
        }

        // Add hash password, Add image
        $requestData = array_merge($request->all(), [
            'password' => Hash::make($request->password),
            'image' => 'images/users/' . $fileName
        ]);

        // Create User
        $user = User::create($requestData);

        return response()->json([
            'data' => $user,
            'message' => 'Successfully added the user.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json($user, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Count the request
        if (count($request->all()) < 1) {
            return $this->displayMessage('Pass at least one field value in the request');
        }

        // Intialize request data variable
        $requestData = [];

        // if not empty, add to the request data
        if (!empty($request->user_name)) {
            $requestData['user_name'] = $request->user_name;
        }
        if (!empty($request->email)) {
            $requestData['email'] = $request->email;
        }
        if (!empty($request->password)) {
            $requestData['password'] = Hash::make($request->password);
        }
        if (!empty($request->role)) {
            $requestData['role'] = $request->role;
        }

        if (!empty($request->image)) {
            if ($request->hasFile('image')) {
            dd($request->image);
                $file = $request->file('image');
                $filename = $file->getClientOriginalExtension();
                $fileName = time() . '.' . $filename;
                $file->move('images/users/', $fileName);
            }
        }
//
//        $req = array_merge($request->all(), [
//            'image' => 'images/users/' . $fileName
//        ]);
//
//        // Update the record
        $data = tap(DB::table('users')->where('id', $id))
            ->update($requestData)
            ->first();

        return response()->json([
            'data' => $data,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        User::where('id', $user->id)->delete();

        return $this->displayMessage('The user was successfully deleted ', 200, 'status');
    }
}
