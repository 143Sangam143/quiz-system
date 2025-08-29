<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Log;
use Exception;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $guard = 'admin';

        if (!Auth::guard($guard)->attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid login details'
            ], 401);
        }

        $user  = Auth::guard($guard)->user();
        $role_name = $user->roles()?->first()?->name;
        $token = $user->createToken("{$guard}_token")->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => ucfirst($guard) . ' login successful',
            'token'   => $token,
            'guard'   => $guard,
            'user'    => $user,
            'role' => $role_name
        ]);
    }

    public function register(Request $request){
        try{
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:admins,email',
                // 'phone' => 'required|string|max:10',
                'password' => 'required|min:6',
                // 'password_confirmation' => 'required|same:password'
            ]);

            $admin = Admin::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'parent_id' => 3,
                'pin' => 1213,
                'active' => 1
            ]);
            Log::error($admin);
            $admin->assignRole('user');
            $role = 'user';
    
            return response()->json([
                'success' => true,
                'message' => 'Account registered successfully',
                'user' => $admin,
                'role' => $role,
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to regiester account',
                'error' => $e->getMessage()
            ], 500);
        }
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