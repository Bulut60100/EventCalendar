<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Event extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'userid',
        'date',
        'description',
        'title',
    ];
}
