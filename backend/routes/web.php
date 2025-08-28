<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Base\AnswerController;
use App\Http\Controllers\Base\CategoryController;
use App\Http\Controllers\Base\DifficultyController;
use App\Http\Controllers\Base\PermissionController;
use App\Http\Controllers\Base\QuestionController;
use App\Http\Controllers\Base\RoleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Frontend\FrontpageController;
use Illuminate\Support\Facades\Route;


/*************************************************************************************************************/
/****************************************** Normal Routes ****************************************************/
/*************************************************************************************************************/
Route::get('/register', [RegisterController:: class,'create'])->name('register.create')->middleware('guest');
Route::post('/register/update', [RegisterController:: class,'store'])->name('register.store')->middleware('guest');

Route::get('/login', [LoginController::class, 'login'])->name('login')->middleware('guest');
Route::post('/authenticate', [LoginController::class,'authenticate'])->name('authenticate')->middleware('guest');

Route::get('/admins', [LoginController::class, 'admin_login'])->name('admin.login')->middleware('guest');
Route::post('/admin/authenticate', [LoginController::class,'admin_authenticate'])->name('admin.authenticate')->middleware('guest');

Route::get('/logout', [LoginController::class,'logout'])->name('logout');
Route::get('/userfront', [DashboardController::class,'userfront'])->name('userfront');

/*************************************************************************************************************/
/***************************************** Frontend Routes ***************************************************/
/*************************************************************************************************************/
Route::get('/', [FrontpageController::class,'index'])->name('home');

/*************************************************************************************************************/
/****************************************** Backend Routes ***************************************************/
/*************************************************************************************************************/

Route::group(['prefix' => 'admin', 'middleware' => ['auth:admin', 'admin']], function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);
    Route::resource('manage-admins', AdminController::class);

    Route::resource('manage-categories', CategoryController::class);
    Route::resource('manage-difficulties', DifficultyController::class);
    Route::resource('manage-questions', QuestionController::class);
    Route::resource('manage-answers', AnswerController::class);

});