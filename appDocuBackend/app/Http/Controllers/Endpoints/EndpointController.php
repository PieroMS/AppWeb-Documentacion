<?php

namespace App\Http\Controllers\Endpoints;

use App\Http\Controllers\Controller;
use App\Models\Endpoint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class EndpointController extends Controller
{
    public function listEndpoints($id)
    {
        try {
            $endpoints = Endpoint::leftJoin('users as u', 'endpoints.user_id', '=', 'u.id')
                ->leftJoin('projects as p', 'endpoints.project_id', '=', 'p.id')
                ->leftJoin('progress as ps', 'endpoints.progress_id', '=', 'ps.id')
                ->leftJoin('requests as r', 'endpoints.request_id', '=', 'r.id')
                ->select(
                    'endpoints.id',
                    'endpoints.dir_controller',
                    'endpoints.endpoint_name',
                    'endpoints.url',
                    'endpoints.procedure',
                    'endpoints.bruno_data',
                    'endpoints.request_id as e_request_id',
                    'r.id as request_id',
                    'r.name as request_name',
                    'endpoints.description',
                    'endpoints.progress_id as e_progress_id',
                    'ps.id as progress_id',
                    'ps.name as progress_name',
                    'ps.color as progress_color',
                    'endpoints.user_id as e_user_id',
                    'u.id as user_id',
                    'u.name as user_name',
                    'endpoints.project_id as e_project_id',
                    'p.id as project_id',
                    'p.name as project_name'
                )
                ->where('endpoints.project_id', $id)
                ->orderBy('endpoints.dir_controller', 'asc')
                ->get();

            return response()->json([
                'message' => 'Lista de endpoints obtenida correctamente',
                'data' => $endpoints
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function listEndpointsById($id)
    {
        try {
            $endpoint = Endpoint::leftJoin('users as u', 'endpoints.user_id', '=', 'u.id')
                ->leftJoin('projects as p', 'endpoints.project_id', '=', 'p.id')
                ->leftJoin('progress as ps', 'endpoints.progress_id', '=', 'ps.id')
                ->leftJoin('requests as r', 'endpoints.request_id', '=', 'r.id')
                ->select(
                    'endpoints.id',
                    'endpoints.dir_controller',
                    'endpoints.endpoint_name',
                    'endpoints.url',
                    'endpoints.procedure',
                    'endpoints.bruno_data',
                    'endpoints.request_id as e_request_id',
                    'endpoints.description',
                    'endpoints.progress_id as e_progress_id',
                    'endpoints.user_id as e_user_id',
                    'p.id as project_id'
                )
                ->where('endpoints.id', $id)
                ->get();

                if(!$endpoint){
                    return response()->json([
                        'message' => 'Endpoint no encontrado',
                        'status' => 404
                    ]);
                };
                return response()->json([
                    'message' => 'Endpoint obtenido correctamente',
                    'data' => $endpoint
                ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function createEndpoints($id, Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'dir_controller' => 'required|string|max:100',
                'endpoint_name' => [
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('endpoints')->where(function ($query) use ($id) {
                        return $query->where('project_id', $id);
                    }),
                ],
                'url' => 'required|string|max:255',
                'procedure' => 'nullable|string|max:100',
                'bruno_data' => 'required|string|max:100',
                'request_id' => 'required',
                'description' => 'required|string|max:255',
                'progress_id' => 'required',
                'user_id' => 'required'
            ], [
                'endpoint_name.unique' => 'El nombre ya existe en este proyecto.'
            ]);

            if($validate->fails()){
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $endpoint = Endpoint::create([
                'dir_controller' => $request->dir_controller,
                'endpoint_name' => $request->endpoint_name,
                'url' => $request->url,
                'procedure' => $request->procedure ?? '-',
                'bruno_data' => $request->bruno_data,
                'request_id' => $request->request_id,
                'description' => $request->description,
                'progress_id' => $request->progress_id,
                'user_id' => $request->user_id,
                'project_id' => $id
            ]);

            return response()->json([
                'message' => 'Endpoint creado correctamente',
                'data' => $endpoint
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updateEndpoint($id, Request $request)
    {
        try {
            $endpoint = Endpoint::find($id);

            if(!$endpoint){
                return response()->json([
                    'message' => 'Endpoint no encontrado',
                    'status' => 404
                ]);
            };

            $validate = Validator::make($request->all(), [
                'dir_controller' => 'required|string|max:100',
                'endpoint_name' => [
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('endpoints', 'endpoint_name')
                        ->where(function ($query) use ($id) {
                            return $query->where('project_id', $id);
                        })
                        ->ignore($id),
                ],
                'url' => 'required|string|max:255',
                'procedure' => 'nullable|string|max:100',
                'bruno_data' => 'required|string|max:100',
                'request_id' => 'required',
                'description' => 'required|string|max:255',
                'progress_id' => 'required',
                'user_id' => 'required'
            ], [
                'endpoint_name.unique' => 'El nombre ya existe en este proyecto.'
            ]);

            if($validate->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            };

            $endpoint->dir_controller = $request->dir_controller;
            $endpoint->endpoint_name = $request->endpoint_name;
            $endpoint->url = $request->url;
            $endpoint->procedure = $request->procedure ?? '-';
            $endpoint->bruno_data = $request->bruno_data;
            $endpoint->request_id = $request->request_id;
            $endpoint->description = $request->description;
            $endpoint->progress_id = $request->progress_id;
            $endpoint->user_id = $request->user_id;
            $endpoint->save();

            return response()->json([
                'message' => 'Endpoint actualizado correctamente',
                'data' => $endpoint
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteEndpoint($id)
    {
        try {
            $endpoint = Endpoint::find($id);

            if(!$endpoint){
                return response()->json([
                    'message' => 'Endpoint no encontrado',
                    'status' => 404
                ]);
            };

            $endpoint->delete();

            return response()->json([
                'message' => 'Endpoint eliminado correctamente',
                'data' => $endpoint
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
}