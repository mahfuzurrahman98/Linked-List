<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ShopAPIController;

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
    Route::put('/update-theme/{id}', [ShopAPIController::class, 'updateShopTheme']);
    Route::post('/update-user/{id}', [UserController::class, 'update']);
    Route::put('/update-cards/{id}', [ShopAPIController::class, 'updateShopCards']);
    Route::put('/update-links/{id}', [ShopAPIController::class, 'updateShopLinks']);
    Route::post('/update-images/{id}', [ShopAPIController::class, 'updateShopImages']);
    Route::put('/update-videos/{id}', [ShopAPIController::class, 'updateShopVideos']);
    Route::put('/update-contacts/{id}', [ShopAPIController::class, 'updateShopContacts']);
    Route::post('/upload-image/{id}', [ShopAPIController::class, 'uploadImages']);
});


// get routes
Route::get('/get-user/{username}', [UserController::class, 'show']);
Route::get('/get-theme/{id}', [ShopAPIController::class, 'getShopTheme']);
Route::get('/get-links/{id}', [ShopAPIController::class, 'getShopLinks']);
Route::get('/get-images/{id}', [ShopAPIController::class, 'getShopImages']);
Route::get('/get-videos/{id}', [ShopAPIController::class, 'getShopVideos']);
Route::get('/get-contacts/{id}', [ShopAPIController::class, 'getShopContacts']);

Route::get('/get-descriptions/{id}', [ShopAPIController::class, 'getShopDescriptions']);
Route::get('/get-all-uploaded-images/{id}', [ShopAPIController::class, 'getAllImages']);
Route::get('/get-cards/{id}', [ShopAPIController::class, 'getShopCards']);
