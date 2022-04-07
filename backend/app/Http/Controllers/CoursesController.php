<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\GroupCourse;
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

        if (isset($request->all)) {
            return Courses::where('ClassIndexId', $request->ClassIndexId)->where('delete', 0)->get();
        } else if (isset($request->delete)) {
            return Courses::where('ClassIndexId', $request->ClassIndexId)->where('sem', null)->where('delete', 1)->get();
        } else {
            return Courses::where('ClassIndexId', $request->ClassIndexId)->where('sem', null)->where('delete', 0)->orderBy('groupCourseId')->get();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Courses::where('code', $request->code)->first() && !isset($request->id))
            return ['type' => 'error', 'message' => 'Mã Môn học bị trùng'];
        if (isset($request->id)) $obj = Courses::find($request->id);
        else $obj = new Courses();
        if ($obj) {
            $obj->code = $request->code;
            $obj->name = $request->name;
            $obj->credits = $request->credits;

            $obj->theory = $request->check_theory_practice === true ? $request->theory : 0;
            $obj->practice = $request->check_theory_practice === true ? $request->practice : 0;
            $obj->coursesType = $request->coursesType;
            $obj->ClassIndexId = $request->ClassIndexId;
            $obj->store = $request->store ?? true;
            $obj->prerequisite = $request->prerequisite;
            $obj->learnFirst = $request->learnFirst;
            $obj->parallel = $request->parallel;

            $obj->groupCourseId = $request->groupCourseId;
            return $obj->save() ?
                ['type' => 'success', 'message' => isset($request->id) ? 'Cập nhật khóa học thành công' : 'Thêm khóa học thành công'] :
                ['type' => 'error', 'message' => isset($request->id) ? 'Cập nhật khóa học thất bại' : 'Thêm khóa học thất bại'];
        } else
            return ['type' => 'error', 'message' => 'Không tìm thấy khóa học muốn cập nhật'];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        return Courses::where('ClassIndexId', $request->ClassIndexId)->where('delete', 0)->where('sem', $request->sem)->orderBy('groupCourseId')->get();
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
        if ($courses->groupCourseId !== null) {
            $courses->groupCourseId = null;
            $courses->save();

            $group = GroupCourse::all();
            foreach ($group as $item) {
                $count = Courses::where('groupCourseId', $item->id)->count();
                if ($count === 0) {
                    $item->delete();
                } else if ($count === 1) {
                    $co = Courses::where('groupCourseId', $item->id)->first();
                    $co->sem = null;
                    $co->save();
                    $item->delete();
                }
            }

            return ['type' => 'success', 'message' => 'Thành công'];
        }

        return $courses->save() ?
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
        if (isset($request->delete)) {
            $courses = Courses::find($id);
            return $courses->delete() ?
                ['type' => 'success'] : ['type' => 'error'];
        } else {
            $courses = Courses::find($id);
            $courses->delete = !$courses->delete;
            $courses->sem = null;
            return $courses->save() ?
                ['type' => 'success'] : ['type' => 'error'];
        }
    }
   
}
