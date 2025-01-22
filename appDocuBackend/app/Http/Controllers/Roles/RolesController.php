<?php

namespace App\Http\Controllers\Roles;

use App\Http\Controllers\Controller;
use App\Models\Rols;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolesController extends Controller
{
    public function listRoles()
    {
        try {
            $roles = Rols::all();
            return response()->json([
                'message' => 'Lista de roles obtenida correctamente',
                'data' => $roles
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
    
    public function listRolesById($id)
    {
        try {
            $roles = Rols::find($id);

            if(!$roles){
                return response()->json([
                    'message' => 'Rol no encontrado',
                    'status' => 404
                ]);
            };
            return response()->json([
                'message' => 'Lista de roles obtenida correctamente',
                'data' => $roles
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function createRoles(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name' => 'required|string|max:20|unique:rols,name',
                'description' => 'nullable|string|max:100',
            ], [
                'name.unique' => 'El tipo de rol ya existe.'
            ]);

            if($validate->fails()){
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $roles = Rols::create([
                'name' => $request->name,
                'description' => $request->description ? $request->description : '-'
            ]);

            return response()->json([
                'message' => 'Rol creado correctamente',
                'data' => $roles
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updateRoles(Request $request, $id)
    {
        try {
            $roles = Rols::find($id);

            if(!$roles){
                return response()->json([
                    'message' => 'Rol no encontrado',
                    'status' => 404
                ]);
            };

            $validate = Validator::make($request->all(), [
                'name' => 'required|string|unique:rols,name,' . $id,
                'description' => 'nullable|string|max:100'
            ], [
                'name.unique' => 'El tipo de rol ya existe.'
            ]);

            if($validate->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $roles->name = $request->name;
            $roles->description = $request->description ? $request->description : '-';
            $roles->save();

            return response()->json([
                'message' => 'Rol actualizado correctamente',
                'data' => $roles
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteRoles($id)
    {
        try {
            $roles = Rols::find($id);

            if(!$roles){
                return response()->json([
                    'message' => 'Rol no encontrado',
                    'status' => 404
                ]);
            };

            $users = User::where('rol_id', '=', $id)->get();
            foreach ($users as $user) {
                $user->delete();
            }

            $roles->delete();

            return response()->json([
                'message' => 'Rol eliminado correctamente',
                'data' => $roles
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
