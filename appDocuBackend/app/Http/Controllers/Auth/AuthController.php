<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Rols;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $userValidate = Validator::make($request->all(), [
                'name' => [
                    'required',
                    Rule::unique('users', 'name')->where('status', 1)
                ],
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                'rol_id' => 'required|integer|exists:rols,id',
                'area_id' => 'required|integer|exists:areas,id'
            ], [
                'email.unique' => 'El correo debe ser único',
                'name.unique' => 'El nombre debe ser único'
            ]);

            if($userValidate->fails()){
                return response()->json([
                    'message' => 'Error de validacion',
                    'error' => $userValidate->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'rol_id' => $request->rol_id,
                'area_id' => $request->area_id
            ]);

            return response()->json([
                'message' => 'Usuario registrado satisfactoriamente',
                'user' => $user
                //'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(),[
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'message' => 'Error de validacion',
                    'error' => $validateUser->errors()
                ], 401);
            }

            // Valida si no existe
            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'message' => 'El correo o contraseña no existe'
                ], 401);
            }

            $statusUser = User::where('status', 0)->where('email', $request->email)->first();
            if ($statusUser) {
                return response()->json([
                    'message' => 'El correo o contraseña no existe'
                ], 401);
            }

            $user = User::where('email', $request->email)->first();
            $rolData = Rols::where('id', $user->rol_id)->pluck('name')->first();

            return response()->json([
                'message' => 'Sesion iniciada',
                'user' => $user->name,
                'rol' => $rolData,
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updatePassword(Request $request, $id)
    {
        try {
            $user = User::find($id);
            if(!$user){
                return response()->json([
                    'message' => 'Usuario no encontrado',
                    'status' => 404
                ]);
            };

            $validateData = Validator::make($request->all(), [
                'passwordOne' => 'required',
                'passwordTwo' => 'required|same:passwordOne'
            ], [
                'passwordTwo.same' => 'La contraseña no coincide',
            ]);

            if ($validateData->fails()) {
                return response()->json([
                    'message' => 'Error de validacion',
                    'error' => $validateData->errors()
                ], 401);
            }

            $user->password = Hash::make($request->passwordOne);
            $user->save();

            return response()->json([
                'message' => 'Contraseña actualizada correctamente',
                'name' => $user->name,
                'password' => $user->password
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    // public function profile()
    // {
    //     $userData = auth()->user();
    //     return response()->json([
    //         'message' => 'Info',
    //         'data' => $userData,
    //         'id' => auth()->user()->id,
    //     ], 200);
    // }

    public function logout()
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Sesion cerrada',
            'data' => []
        ], 200);
    }
}
