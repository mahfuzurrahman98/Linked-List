<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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
    Route::put('/update-shop-theme/{id}', [ShopAPIController::class, 'updateShopTheme']);
    Route::post('/update-shop-data/{id}', [RestorantController::class, 'updateShopData']);
    Route::put('/update-shop-cards/{id}', [ShopAPIController::class, 'updateShopCards']);
    Route::put('/update-shop-links/{id}', [ShopAPIController::class, 'updateShopLinks']);
    Route::post('/update-shop-images/{id}', [ShopAPIController::class, 'updateShopImages']);
    Route::put('/update-shop-videos/{id}', [ShopAPIController::class, 'updateShopVideos']);
    Route::put('/update-shop-contacts/{id}', [ShopAPIController::class, 'updateShopContacts']);

    Route::put('/update-shop-descriptions/{id}', [ShopAPIController::class, 'updateShopDescriptions']);
    Route::post('/upload-shop-image/{id}', [ShopAPIController::class, 'uploadImages']);
    Route::put('/update-shop-view/{id}', [ShopAPIController::class, 'updateShopView']);
    Route::put('/update-shop-text/{id}', [ShopAPIController::class, 'updateShopText']);

    Route::get('/insert-shop-view', [ShopAPIController::class, 'insertIntoShopView']);
});


// get routes
Route::get('/get-shop-data/{id}', [ShopAPIController::class, 'getShopData']);
Route::get('/get-shop-theme/{id}', [ShopAPIController::class, 'getShopTheme']);
Route::get('/get-shop-links/{id}', [ShopAPIController::class, 'getShopLinks']);
Route::get('/get-shop-images/{id}', [ShopAPIController::class, 'getShopImages']);
Route::get('/get-shop-videos/{id}', [ShopAPIController::class, 'getShopVideos']);
Route::get('/get-shop-contacts/{id}', [ShopAPIController::class, 'getShopContacts']);

Route::get('/get-shop-descriptions/{id}', [ShopAPIController::class, 'getShopDescriptions']);
Route::get('/get-all-uploaded-shop-images/{id}', [ShopAPIController::class, 'getAllImages']);
Route::get('/get-shop-cards/{id}', [ShopAPIController::class, 'getShopCards']);

Route::get('/get-shop-items/{id}', [FrontEndController::class, 'restorant2']);
Route::get('/get-shop-view/{id}', [ShopAPIController::class, 'getShopView']);
Route::get('/get-shop-text/{id}', [ShopAPIController::class, 'getShopText']);
Route::get('/get-user-id/{username}', [AuthController::class, 'getUserByUsername']);
