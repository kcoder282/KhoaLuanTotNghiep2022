<?php

use App\Http\Controllers\ClassIndexController;
use App\Http\Controllers\ClassNameController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\CoursesTypeController;
use App\Http\Controllers\excelToData;
use App\Http\Controllers\GroupCourseController;
use App\Http\Controllers\InfoAssignmentController;
use App\Http\Controllers\LecturersController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::apiResource('class_index', ClassIndexController::class);
Route::apiResource('group_course', GroupCourseController::class);
Route::apiResource('courses_type', CoursesTypeController::class);
Route::apiResource('course', CoursesController::class);
Route::apiResource('className', ClassNameController::class);
Route::apiResource('assignment', InfoAssignmentController::class);
Route::apiResource('lecturers', LecturersController::class);
Route::get('ResetClassIndex/{id}',[excelToData::class, 'Reset']);
Route::post('CourseTypeInstall/{id}', [excelToData::class, 'AddType']);
Route::post('CourseInstall/{id}', [excelToData::class, 'AddCourses']);
Route::post('CourseIntallDetail/{id}', [excelToData::class, 'AddCoursesDetail']);

Route::post('login',[UsersController::class, 'login']);
Route::get('user', [UsersController::class, 'user']);
Route::get('listUser', [UsersController::class, 'listUser']);
Route::post('addUser', [UsersController::class, 'addUser']);
?>