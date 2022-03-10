<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\CoursesType;
use Illuminate\Http\Request;

class CoursesTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $coType = CoursesType::where('ClassIndexId', $request->classIndexId)->get();
        foreach ($coType as $value) {
            $value->countData = Courses::where('coursesType', $value->id)->count();
        }
        return $coType;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(isset($request->id)) $obj = CoursesType::find($request->id);
        else $obj = new CoursesType();
        if($obj){
        $obj->name = $request->name;
        $obj->color = $request->color;
        $obj->des = $request->des??'';
        $obj->ClassIndexId = $request->ClassIndexId;

        return $obj->save()? 
        ['type'=>'success', 'message'=>isset($request->id)? 'Cập nhật thành công':'Tạo thành công khối kiến thức mới']:
        ['type'=>'error', 'message'=> isset($request->id) ? 'Cập nhật thất bại' : 'Tạo thất bại khối kiến thức mới'];}else
        return ['type' => 'error', 'message' => 'Thất bại do ko tìm thấy khối kiến thức'];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CoursesType  $coursesType
     * @return \Illuminate\Http\Response
     */
    public function show(CoursesType $coursesType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CoursesType  $coursesType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CoursesType $coursesType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CoursesType  $coursesType
     * @return \Illuminate\Http\Response
     */
    public function destroy(CoursesType $coursesType)
    {
        return $coursesType->delete()? 
        ['type' => 'success', 'message' => 'Xóa khối kiến thức thành công'] :
        ['type' => 'error', 'message' => 'Xóa khối kiến thức thất bại'];
    }
}
