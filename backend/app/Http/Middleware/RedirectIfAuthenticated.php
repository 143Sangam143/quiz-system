<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard('web')->check()) {
            return redirect()->back()->with([
                'info' => true,
                'message' => 'You are already logged in.'
            ]);
        }
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard')->with([
                'info' => true,
                'message' => 'You are already logged in.'
            ]);
        }
        return $next($request);
    }
}
