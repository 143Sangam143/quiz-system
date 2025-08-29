<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Base\AnswerController;
use App\Http\Controllers\Base\CategoryController;
use App\Http\Controllers\Base\DifficultyController;
use App\Http\Controllers\Base\QuestionController;
use App\Http\Controllers\Base\QuizController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [LoginController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::resource('categories',CategoryController::class);
    Route::resource('difficulties',DifficultyController::class);
    Route::resource('questions',QuestionController::class);
    // Route::resource('answers/{questionUri}',AnswerController::class);
    Route::get('/answers/{questionUri}',[AnswerController::class,'index']);
    Route::resource('quizzes', QuizController::class);

    Route::post('/questions/filter',[QuizController::class,"filterQuestion"]);


});