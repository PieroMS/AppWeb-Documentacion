<?php

namespace App\Http\Controllers\RequestsType;

use App\Http\Controllers\Controller;
use App\Models\RequestType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequestsTypeController extends Controller
{
    public function listRequestsType()
    {
        try {
            $requestType = RequestType::all();
            return response()->json([
                'message' => 'Lista de tipos de requests obtenido correctamente',
                'data' => $requestType
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function listRequestsTypeById($id)
    {
        try {
            $requestType = RequestType::find($id);

            if(!$requestType){
                return response()->json([
                    'message' => 'Tipo de request no encontrado',
                    'status' => 404
                ]);
            };

            return response()->json([
                'message' => 'Tipo de request obtenido correctamente',
                'data' => $requestType
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function createRequestsType(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name' => 'required|string|max:20|unique:requests,name'
            ], [
                'name.unique' => 'El tipo de request ya existe.'
            ]);

            if($validate->fails()){
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $requestType = RequestType::create([
                'name' => strtoupper($request->name)
            ]);

            return response()->json([
                'message' => 'Tipo de request creado correctamente',
                'data' => $requestType
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updateRequestsType(Request $request, $id)
    {
        try {
            $requestType = RequestType::find($id);

            if(!$requestType){
                return response()->json([
                    'message' => 'Tipo de request no encontrado',
                    'status' => 404
                ]);
            };

            $validate = Validator::make($request->all(), [
                'name' => 'required|string|max:20|unique:requests,name,' . $id
            ], [
                'name.unique' => 'El tipo de request ya existe.'
            ]);

            if($validate->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $requestType->name =strtoupper($request->name);
            $requestType->save();

            return response()->json([
                'message' => 'Tipo de request actualizado correctamente',
                'data' => $requestType
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteRequestsType($id)
    {
        try {
            $requestType = RequestType::find($id);

            if(!$requestType){
                return response()->json([
                    'message' => 'Tipo de request no encontrado',
                    'status' => 404
                ]);
            };

            $requestType->delete();

            return response()->json([
                'message' => 'Tipo de requtes eliminado correctamente',
                'data' => $requestType
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
