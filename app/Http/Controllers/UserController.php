<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UserController extends Controller {
    protected $imagePath = 'uploads/logos/';

    public function show($username) {
        $user = User::where('username', $username)
            ->first(['name', 'username', 'bio', 'logo', 'email']);

        if (!$user) {
            $response = [
                'success' => false,
                'message' => 'User not found'
            ];

            return response()->json($response, 404);
        }

        return $user;
    }

    public function update(Request $req, $id) {
        $user = User::find($id);
        // return $user;

        $user->name = $req->name;
        $user->bio = $req->bio;

        if ($req->hasFile('u_logo')) {
            $uuid = Str::uuid()->toString();
            $req->u_logo->move(public_path($this->imagePath), $uuid . '_img.png');
            $user->logo = $this->imagePath . $uuid . '_img.png';
        }
        $user->save();
    }
}
