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
        return isset($request->all)?
        Courses::where('ClassIndexId',$request->ClassIndexId)->where('delete', 0)->get()
        :(isset($request->delete)?
        Courses::where('ClassIndexId',$request->ClassIndexId)->where('sem', null)->where('delete', 1)->get():
        Courses::where('ClassIndexId',$request->ClassIndexId)->where('sem', null)->where('delete', 0)->get());
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
            $obj->store = $request->store??true;
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
    public function show(Request $request)
    {
        return Courses::where('ClassIndexId', $request->ClassIndexId)->
        where('delete', 0)->where('sem', $request->sem)->get();                            
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $courses = Courses::find($id);
        $courses->sem = $request->sem;
        return $courses->save()?
        ['type' => 'success', 'message' => 'Thành công'] :
        ['type' => 'error', 'message' => 'Thất bại'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        if(isset($request->delete)){
            $courses = Courses::find($id);
            return $courses->delete() ?
            ['type' => 'success'] : ['type' => 'error'];
        }else{
            $courses = Courses::find($id);
            $courses->delete = !$courses->delete;
            $courses->sem = null;
            return $courses->save() ?
            ['type' => 'success'] : ['type' => 'error'];
        }
    }
}
