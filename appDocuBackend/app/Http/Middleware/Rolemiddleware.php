<?php

namespace App\Http\Middleware;

use App\Models\Rols;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class Rolemiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json([
                'message' => 'Usuario no autenticado'
            ], 401);
        }
        
        $userRole = Rols::where('id', $user->rol_id)->pluck('name')->first();

        if ($userRole === $role) {
            return $next($request);
        }

        return response()->json([
            'message' => 'No tienes los permisos necesarios para acceder'
        ], 403);
    }
}
