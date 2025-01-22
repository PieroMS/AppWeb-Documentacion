<?php

namespace App\Http\Controllers\Areas;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AreaController extends Controller
{
    public function listArea()
    {
        try {
            $area = Area::all();
            return response()->json([
                'message' => 'Lista de areas obtenida correctamente',
                'data' => $area
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function listAreasById($id)
    {
        try {
            $area = Area::find($id);

            if(!$area){
                return response()->json([
                    'message' => 'Area no encontrada',
                    'status' => 404
                ]);
            };

            return response()->json([
                'message' => 'Area obtenida correctamente',
                'data' => $area
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function createAreas(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name' => 'required|string|max:20|unique:areas,name'
            ], [
                'name.unique' => 'El área ya existe.'
            ]);

            if($validate->fails()){
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $area = Area::create([
                'name' => $request->name
            ]);

            return response()->json([
                'message' => 'Area creada correctamente',
                'data' => $area
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updateAreas(Request $request, $id)
    {
        try {
            $area = Area::find($id);

            if(!$area){
                return response()->json([
                    'message' => 'Area no encontrada',
                    'status' => 404
                ]);
            };

            $validate = Validator::make($request->all(), [
                'name' => 'required|string|max:20|unique:areas,name,' . $id
            ], [
                'name.unique' => 'El área ya existe.'
            ]);

            if($validate->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $area->name = $request->name;
            $area->save();

            return response()->json([
                'message' => 'Area actualizada correctamente',
                'data' => $area
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteAreas($id)
    {
        try {
            $area = Area::find($id);

            if(!$area){
                return response()->json([
                    'message' => 'Area no encontrada',
                    'status' => 404
                ]);
            };

            $users = User::where('area_id', '=', $id)->get();
            foreach ($users as $user) {
                $user->delete();
            }

            $area->delete();

            return response()->json([
                'message' => 'Area eliminada correctamente',
                'data' => $area
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
