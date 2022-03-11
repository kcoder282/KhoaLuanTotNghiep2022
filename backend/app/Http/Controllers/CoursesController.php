<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Courses::where('ClassIndexId',$request->ClassIndexId)->where('sem', null)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(Courses::where('code', $request->code)->first()) 
        return ['type' => 'error', 'message' => 'Mã Môn học bị trùng'];
        if(isset($request->id)) $obj = Courses::find($request->id);
        else $obj = new Courses();
        if($obj){
            $obj->code = $request->code;
            $obj->name = $request->name;
            $obj->credits = $request->credits;
            $obj->theory = $request->theory;
            $obj->practice = $request->practice;
            $obj->coursesType = $request->coursesType;
            $obj->ClassIndexId = $request->ClassIndexId;

            $obj->prerequisite = $request->prerequisite;
            $obj->learnFirst = $request->learnFirst;
            $obj->parallel = $request->parallel;

            $obj->groupCourseId = $request->groupCourseId;
            return $obj->save()?
            ['type'=>'success', 'message'=> isset($request->id)?'Cập nhật khóa học thành công':'Thêm khóa học thành công']:
            ['type'=>'error','message'=> isset($request->id) ? 'Cập nhật khóa học thất bại' : 'Thêm khóa học thất bại'];
        }else
        return ['type'=>'error','message'=>'Không tìm thấy khóa học muốn cập nhật'];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function show(Courses $courses)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Courses $courses)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function destroy(Courses $courses)
    {
        //
    }
}
