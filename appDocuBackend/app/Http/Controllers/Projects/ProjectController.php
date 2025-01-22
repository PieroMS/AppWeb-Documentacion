<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Endpoint;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function listProjects()
    {
        try {
            $projects = Project::select('projects.id as id', 'projects.name as project_name', 'projects.assigned_name', 'projects.start_date', 'projects.comments', 'progress.name as progress_name', 'progress.color')
                ->leftJoin('progress', 'projects.progress_id', '=', 'progress.id')
                ->get();
            return response()->json([
                'message' => 'Lista de proyectos obtenida correctamente',
                'data' => $projects
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function listProjectsById($id)
    {
        try {
            $projectId = Project::find($id);
            if (!$projectId) {
                return response()->json([
                    'message' => 'Proyecto no encontrado',
                    'status' => 404
                ], 404);
            }
            return response()->json([
                'message' => 'Proyecto obtenido correctamente',
                'data' => $projectId
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function listAllProjectsById($id)
    {
        try {
            $project = Project::select('projects.id', 'projects.name as project_name', 'projects.assigned_name', 'projects.start_date', 'projects.comments', 'progress.name as progress_name', 'progress.color' )
                ->leftJoin('progress', 'projects.progress_id', '=', 'progress.id')
                ->where('projects.id', '=', $id)
                ->get();
            if (!$project) {
                return response()->json([
                    'message' => 'Proyecto no encontrado',
                    'status' => 404
                ], 404);
            }
            return response()->json([
                'message' => 'Proyecto obtenido correctamente',
                'data' => $project
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function createProjects(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name' => 'required|string|max:60',
                'assigned_name' => 'nullable|max:50', 
                'start_date' => 'required|date', 
                'comments' => 'nullable|max:255', 
                'progress_id' => 'required|exists:progress,id'
            ]);

            if($validate->fails()){
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $projects = Project::create([
                'name' => $request->name,
                'assigned_name' => $request->assigned_name ? $request->assigned_name : '-',
                'start_date' =>  $request->start_date,
                'comments' => $request->comments ? $request->comments : '-',
                'progress_id' => $request->progress_id
            ]);

            return response()->json([
                'message' => 'Proyecto creado correctamente',
                'data' => $projects
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updateProjects(Request $request, $id)
    {
        try {
            $projects = Project::find($id);

            if(!$projects){
                return response()->json([
                    'message' => 'Proyecto no encontrado',
                    'status' => 404
                ]);
            };

            $validate = Validator::make($request->all(), [
                'name' => 'required|string|max:60',
                'assigned_name' => 'nullable|max:50', 
                'start_date' => 'required|date', 
                'comments' => 'nullable|max:255', 
                'progress_id' => 'required|exists:progress,id'
            ]);

            if($validate->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validate->errors()
                ], 422);
            }

            $projects->name = $request->name;
            $projects->assigned_name = $request->assigned_name ? $request->assigned_name : '-';
            $projects->start_date = $request->start_date;
            $projects->comments = $request->comments ? $request->comments : '-';
            $projects->progress_id = $request->progress_id;
            $projects->save();

            return response()->json([
                'message' => 'Proyecto actualizado correctamente',
                'data' => $projects
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteProjects($id)
    {
        try {
            $project = Project::find($id);

            if(!$project){
                return response()->json([
                    'message' => 'Projecto no encontrado',
                    'status' => 404
                ]);
            };
            
            $endpoints = Endpoint::where('project_id', $id)->get();
            foreach ($endpoints as $endpoint) {
                $endpoint->delete();
            }

            $project->delete();

            return response()->json([
                'message' => 'Proyecto eliminado correctamente',
                'data' => $project
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
}