<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $guard = 'web';

        if (!Auth::guard($guard)->attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid login details'
            ], 401);
        }

        $user  = Auth::guard($guard)->user();
        $token = $user->createToken("{$guard}_token")->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => ucfirst($guard) . ' login successful',
            'token'   => $token,
            'guard'   => $guard,
            'user'    => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }
}