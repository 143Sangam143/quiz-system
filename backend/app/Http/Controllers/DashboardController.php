<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(){
        return view('admin.dashboard.index');
    }

    public function userfront()
    {
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard')->with([
                'success' => true,
                'message' => 'Successfully logged in as admin.',
            ]);
        }
        if (Auth::guard('web')->check()) {
            return redirect()->route('home')->with([
                'success' => true,
                'message' => 'Successfully logged in.',
            ]);
        }
        return redirect()->route('home');
    }
}
