<?php

use App\Http\Controllers\ClassIndexController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\CoursesTypeController;
use App\Http\Controllers\GroupCourseController;
use App\Http\Controllers\SemesterController;
use Illuminate\Support\Facades\Route;

Route::apiResource('class_index', ClassIndexController::class);
Route::apiResource('group_course', GroupCourseController::class);
Route::apiResource('semester', SemesterController::class);
Route::apiResource('courses_type', CoursesTypeController::class);
Route::apiResource('course', CoursesController::class);
?>