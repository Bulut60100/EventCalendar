<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('events', [EventController::class, 'index']);
Route::get('event/{id}', [EventController::class, 'show']);
Route::post('event', [EventController::class, 'store']);
Route::put('event/{id}', [EventController::class, 'update']);
Route::delete('event/{id}', [EventController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
