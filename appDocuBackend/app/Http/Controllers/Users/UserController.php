<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function listJustUser()
    {
        try {
            $users = User::where('status', '=', '1')->get();
            return response()->json([
                'message' => 'Lista de usuarios obtenido correctamente',
                'data' => $users
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function listUsers()
    {
        try {
            $users = User::leftJoin('rols', 'users.rol_id', '=', 'rols.id')
                ->leftJoin('areas', 'users.area_id', '=', 'areas.id')
                ->select('users.id', 'users.name as user_name', 'users.email', 'users.status', 'rols.name as role_name', 'areas.name as developer_name')
                ->orderBy('users.status', 'desc') 
                ->get();
            return response()->json([
                'message' => 'Lista de usuarios obtenido correctamente',
                'data' => $users
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function listUserById($id)
    {
        try {
            $user = User::join('rols as r', 'users.rol_id', '=', 'r.id')
            ->join('areas as d', 'users.area_id', '=', 'd.id')
            ->select('users.id as user_id', 'users.name as user_name', 'users.email as user_email',
                     'r.id as rol_id', 'r.name as rol_name', 
                     'd.id as area_id', 'd.name as developer_name')
            ->where('users.id', $id)
            ->first();
            return response()->json([
                'message' => 'Lista de usuarios obtenido correctamente',
                'data' => $user
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updateUsers(Request $request, $id)
    {
        try {
            $users = User::find($id);

            if(!$users){
                return response()->json([
                    'message' => 'Usuario no encontrado',
                    'status' => 404
                ]);
            };

            $validate = Validator::make($request->all(), [
                'name' => [
                    'required',
                    Rule::unique('users', 'name')->where('status', 1)->ignore($id, 'id')
                ],
                'email' => 'required|email|unique:users,email,' . $id, // Permite que el correo del usuario actual no sea considerado como duplicado
                'rol_id' => 'required|integer|exists:rols,id',
                'area_id' => 'required|integer|exists:areas,id'
            ], [
                'email.unique' => 'El correo debe ser único',
                'name.unique' => 'El nombre debe ser único'
            ]);

            if($validate->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            //Validar email existente
            // $email = $request->email;
            // if($email){
            //     $emailExist = User::where('email', $email)
            //         ->where('id', '!=', $id)
            //         ->where('status', 1)
            //         ->get();
            //     if($emailExist->count() >= 1){
            //         return response()->json([
            //             'message' => 'El correo ya existe',
            //             'errors' => $validate->errors()
            //         ], 422);
            //     }
            // }

            $users->name = $request->name;
            $users->email = $request->email;
            $users->rol_id = $request->rol_id;
            $users->area_id = $request->area_id;
            $users->status = $users->status;
            $users->save();

            return response()->json([
                'message' => 'Usuario actualizado correctamente',
                'data' => $users
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteUsers($id)
    {
        try {
            $users = User::find($id);

            if (!$users) {
                return response()->json([
                    'message' => 'Usuario no encontrado',
                    'status' => 404
                ]);
            };

            $users->status = 0;
            $users->save();

            return response()->json([
                'message' => 'Usuario eliminado correctamente',
                'data' => $users
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function restoreUsers($id)
    {
        try {
            $users = User::find($id);

            if (!$users) {
                return response()->json([
                    'message' => 'Usuario no encontrado',
                    'status' => 404
                ]);
            };
            $users->status = 1;
            $users->save();

            return response()->json([
                'message' => 'Usuario restaurado correctamente',
                'data' => $users
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
