<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Areas\AreaController;
use App\Http\Controllers\Endpoints\EndpointController;
use App\Http\Controllers\Progress\ProgressController;
use App\Http\Controllers\Projects\ProjectController;
use App\Http\Controllers\RequestsType\RequestsTypeController;
use App\Http\Controllers\Roles\RolesController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/registerAdmin', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum','role:admin'])->prefix('/admin')->group(function(){
    Route::prefix('/roles')->group(function () {
        Route::get('/listRoles', [RolesController::class, 'listRoles']);
        Route::get('/listRolesById/{id}', [RolesController::class, 'listRolesById']);
        Route::post('/createRoles', [RolesController::class, 'createRoles']);
        Route::put('/updateRoles/{id}', [RolesController::class, 'updateRoles']);
        Route::delete('/deleteRoles/{id}', [RolesController::class, 'deleteRoles']);
    });

    //Progress
    Route::prefix('/progress')->group(function () {
        Route::get('/listProgress', [ProgressController::class, 'listProgress']); 
        Route::get('/listProgressById/{id}', [ProgressController::class, 'listProgressById']); 
        Route::post('/createProgress', [ProgressController::class, 'createProgress']);
        Route::put('/updateProgress/{id}', [ProgressController::class, 'updateProgress']);
        Route::delete('/deleteProgress/{id}', [ProgressController::class, 'deleteProgress']);
    });

    //Areas
    Route::prefix('/areas')->group(function () {
        Route::get('/listArea', [AreaController::class, 'listArea']); 
        Route::get('/listAreasById/{id}', [AreaController::class, 'listAreasById']); 
        Route::post('/createAreas', [AreaController::class, 'createAreas']);
        Route::put('/updateAreas/{id}', [AreaController::class, 'updateAreas']);
        Route::delete('/deleteAreas/{id}', [AreaController::class, 'deleteAreas']);
    });

    //RequestsType
    Route::prefix('/RequestsType')->group(function () {
        Route::get('/listRequestsType', [RequestsTypeController::class, 'listRequestsType']); 
        Route::get('/listRequestsTypeById/{id}', [RequestsTypeController::class, 'listRequestsTypeById']); 
        Route::post('/createRequestsType', [RequestsTypeController::class, 'createRequestsType']);
        Route::put('/updateRequestsType/{id}', [RequestsTypeController::class, 'updateRequestsType']);
        Route::delete('/deleteRequestsType/{id}', [RequestsTypeController::class, 'deleteRequestsType']);
    });
    
    //Users
    Route::prefix('/users')->group(function () {
        Route::get('/listUsers', [UserController::class, 'listUsers']); 
        Route::get('/listUserById/{id}', [UserController::class, 'listUserById']);
        Route::patch('/updateUsers/{id}', [UserController::class, 'updateUsers']);
        Route::delete('/deleteUsers/{id}', [UserController::class, 'deleteUsers']);
        Route::patch('/restoreUsers/{id}', [UserController::class, 'restoreUsers']);
    });
    
    Route::post('/auth/registerUser', [AuthController::class, 'register']);
    Route::patch('/auth/updatePassword/{id}', [AuthController::class, 'updatePassword']);
});

Route::middleware(['auth:sanctum'])->prefix('/dev')->group(function(){
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // ProgressList
    Route::prefix('/progress')->group(function () {
        Route::get('/listProgress', [ProgressController::class, 'listProgress']);
    });
    // Progress
    Route::prefix('/requestType')->group(function () {
        Route::get('/listRequestsType', [RequestsTypeController::class, 'listRequestsType']);
    });
    // User
    Route::prefix('/user')->group(function () {
        Route::get('/listJustUser', [UserController::class, 'listJustUser']);
    });

    //Projects
    Route::prefix('/project')->group(function () {
        Route::get('/listProjects', [ProjectController::class, 'listProjects']); 
        Route::get('/listProjectsById/{id}', [ProjectController::class, 'listProjectsById']);
        Route::get('/listAllProjectsById/{id}', [ProjectController::class, 'listAllProjectsById']);
        Route::post('/createProjects', [ProjectController::class, 'createProjects']);
        Route::put('/updateProjects/{id}', [ProjectController::class, 'updateProjects']);
        Route::delete('/deleteProjects/{id}', [ProjectController::class, 'deleteProjects']);
    });

     //Endpoints
     Route::prefix('/endpoint')->group(function () {
        Route::get('/listEndpoints/{id}', [EndpointController::class, 'listEndpoints']);
        Route::get('/listEndpointsById/{id}', [EndpointController::class, 'listEndpointsById']);
        Route::post('/createEndpoints/{id}', [EndpointController::class, 'createEndpoints']);
        Route::put('/updateEndpoint/{id}', [EndpointController::class, 'updateEndpoint']);
        Route::delete('/deleteEndpoint/{id}', [EndpointController::class, 'deleteEndpoint']);
    });
});