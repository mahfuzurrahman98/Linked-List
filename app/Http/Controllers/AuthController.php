<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {
	public function register(Request $request) {
		$validator = Validator::make($request->all(), [
			'name' => 'required',
			'username' => 'required|unique:users,username',
			'email' => 'required|email|unique:users,email',
			'password' => 'required'
		]);

		if ($validator->fails()) { // registration unsuccessful
			$response = [
				'success' => false,
				'message' => $validator->errors()
			];
			return response()->json($response, 401);
		}

		$input = $request->all();
		$input['password'] = bcrypt($input['password']);
		User::create($input);

		$response = [
			'success' => true,
			'message' => 'User created successfully'
		];

		return response()->json($response, 201);
	}

	public function login(Request $request) {
		$validator = Validator::make($request->all(), [
			'email' => 'required|email',
			'password' => 'required'
		]);

		if ($validator->fails()) { // registration unsuccessful
			$response = [
				'success' => false,
				'message' => $validator->errors()
			];
			return response()->json($response, 401);
		}

		if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
			$user = Auth::user();

			$data['token'] = $user->createToken($user->username)->plainTextToken;
			$data['user'] = $user;

			$response = [
				'success' => true,
				'message' => 'User logged in successfully',
				'data' => $data
			];

			return response()->json($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Unauthorized'
			];
			return response()->json($response, 401);
		}
	}

	public function logout(Request $request) {
		$request->user()->tokens()->delete();
		// Session::flush();
		$response = [
			'success' => true,
			'message' => 'Successfully logged out'
		];
		return response()->json($response, 200);
	}
}
