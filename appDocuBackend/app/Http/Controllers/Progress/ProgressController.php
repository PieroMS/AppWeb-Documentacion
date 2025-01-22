<?php

namespace App\Http\Controllers\Progress;

use App\Http\Controllers\Controller;
use App\Models\Progress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProgressController extends Controller
{
    public function listProgress()
    {
        try {
            $progress = Progress::all();
            return response()->json([
                'message' => 'Lista de progresos obtenida correctamente',
                'data' => $progress
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function listProgressById($id)
    {
        try {
            $progress = Progress::find($id);
            if (!$progress) {
                return response()->json([
                    'message' => 'Progreso no encontrado',
                    'status' => 404
                ], 404);
            }

            return response()->json([
                'message' => 'Progreso obtenido correctamente',
                'data' => $progress
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error interno del servidor',
                'error' => $th->getMessage()
            ], 500);
        }
    }


    public function createProgress(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name' => 'required|string|max:20|unique:progress,name',
                'color' => 'required|string|max:7'
            ], [
                'name.unique' => 'El progreso ya existe.'
            ]);

            if($validate->fails()){
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $progress = Progress::create([
                'name' => $request->name,
                'color' => $request->color
            ]);

            return response()->json([
                'message' => 'Progreso creado correctamente',
                'data' => $progress
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updateProgress(Request $request, $id)
    {
        try {
            $progress = Progress::find($id);

            if(!$progress){
                return response()->json([
                    'message' => 'Progreso no encontrado',
                    'status' => 404
                ]);
            };

            $validate = Validator::make($request->all(), [
                'name' => 'required|string|max:20|unique:progress,name,' . $id,
                'color' => 'required|string|max:7'
            ], [
                'name.unique' => 'El progreso ya existe.'
            ]);

            if($validate->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $progress->name = $request->name;
            $progress->color = $request->color;
            $progress->save();

            return response()->json([
                'message' => 'Progreso actualizado correctamente',
                'data' => $progress
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteProgress($id)
    {
        try {
            $progress = Progress::find($id);

            if(!$progress){
                return response()->json([
                    'message' => 'Progreso no encontrado',
                    'status' => 404
                ]);
            };

            $progress->delete();

            return response()->json([
                'message' => 'Progreso eliminado correctamente',
                'data' => $progress
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
