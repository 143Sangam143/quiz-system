<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function create(){
        return view('auth.register');
    }

    public function store(Request $request)
    {
        try{
            $request->validate([
                'f_name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'phone' => 'required|string|max:10',
                'password' => 'required|min:6',
                'password_confirmation' => 'required|same:password'
            ]);
    
            User::create([
                'name' => $request->f_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password)
            ]);
    
            return redirect()->route('login')->with([
                'success' => true,
                'message' => 'Account registered successfully'
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }
}
