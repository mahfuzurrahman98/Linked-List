<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\UserController;

// FieldController
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // update routes
    Route::post('/update-user/{id}', [UserController::class, 'update']);
    Route::put('/update-theme/{id}', [FieldController::class, 'updateTheme']);
    Route::put('/update-links/{id}', [FieldController::class, 'updateLinks']);
    Route::post('/upload-image/{id}', [FieldController::class, 'uploadImage']);
    Route::post('/update-images/{id}', [FieldController::class, 'updateImages']);
    Route::put('/update-videos/{id}', [FieldController::class, 'updateVideos']);
    Route::put('/update-contacts/{id}', [FieldController::class, 'updateContacts']);
    Route::put('/update-emails/{id}', [FieldController::class, 'updateEmails']);
    Route::put('/update-fields/{id}', [FieldController::class, 'updateFields']);
});

// get routes
Route::get('/get-user/{username}', [UserController::class, 'show']);
Route::get('/get-theme/{id}', [FieldController::class, 'getTheme']);
Route::get('/get-links/{id}', [FieldController::class, 'getLinks']);
Route::get('/get-image-gallery/{id}', [FieldController::class, 'getImageGallery']);
Route::get('/get-images/{id}', [FieldController::class, 'getImages']);
Route::get('/get-videos/{id}', [FieldController::class, 'getVideos']);
Route::get('/get-contacts/{id}', [FieldController::class, 'getContacts']);
Route::get('/get-emails/{id}', [FieldController::class, 'getEmails']);
Route::get('/get-fields/{id}', [FieldController::class, 'getFields']);
