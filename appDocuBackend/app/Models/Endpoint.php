<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Endpoint extends Model
{
    use HasFactory;
    protected $fillable = [
        'dir_controller',
        'endpoint_name',
        'url',
        'procedure',
        'bruno_data',
        'request_id',
        'description',
        'progress_id',
        'user_id',
        'project_id'
    ];
}
