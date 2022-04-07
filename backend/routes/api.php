<?php

use App\Http\Controllers\ClassIndexController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\CoursesTypeController;
use App\Http\Controllers\excelToData;
use App\Http\Controllers\GroupCourseController;
use Illuminate\Support\Facades\Route;

Route::apiResource('class_index', ClassIndexController::class);
Route::apiResource('group_course', GroupCourseController::class);
Route::apiResource('courses_type', CoursesTypeController::class);
Route::apiResource('course', CoursesController::class);

Route::get('ResetClassIndex/{id}',[excelToData::class, 'Reset']);
Route::post('CourseTypeInstall/{id}', [excelToData::class, 'AddType']);
Route::post('CourseInstall/{id}', [excelToData::class, 'AddCourses']);
Route::post('CourseIntallDetail/{id}', [excelToData::class, 'AddCoursesDetail'])
?>