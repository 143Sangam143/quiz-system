<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    public function handle(Request $request, Closure $next)
    {

        $user = Auth::guard('admin')->user();
        
        if ($user && $user->can('has_backend')) {
            return $next($request);
        }
        
        $isAdmin = $user ? true : false;
        
        $isLoggedIn = Auth::guard()->check();
        
        if ($isLoggedIn || $isAdmin) {
            $message = 'Access denied. No required permission detected.';
        } else {
            $message = 'Please log in to access this page.';
        }

        return redirect()->route('home')->with([
            ($isLoggedIn ? 'warning' : 'info') => true,
            'message' => $message,
        ]);
    }
}
