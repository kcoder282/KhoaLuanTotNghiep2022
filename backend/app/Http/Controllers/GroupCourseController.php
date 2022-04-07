<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\GroupCourse;
use Illuminate\Http\Request;

class GroupCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return GroupCourse::where('ClassIndexId', $request->ClassIndexId)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $groupCourse = new GroupCourse();
        $groupCourse->sumCredit = $request->sumCredit;
        $groupCourse->store = $request->store??true;
        $groupCourse->ClassIndexId = $request->ClassIndexId;
        if($groupCourse->save()){
            foreach ($request->list as $value) {
                $course = Courses::find($value);
                $course->groupCourseId = $groupCourse->id;
                $course->store = $request->store ?? true;
                $course->save();
            }
            $group = GroupCourse::all();
            foreach ($group as $item) {
                $count = Courses::where('groupCourseId', $item->id)->count();
                if ($count === 0) {
                    $item->delete();
                } else if ($count === 1) {
                    $co = Courses::where('groupCourseId', $item->id)->first();
                    $co->groupCourseId = null;
                    $co->save();
                    $item->delete();
                }
            }
            return ['type' => 'success'];
        }else{
            return ['type'=>'error'];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GroupCourse  $groupCourse
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return GroupCourse::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GroupCourse  $groupCourse
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        foreach ($request->data as $value) {
            $course = Courses::find($value);
            $course->groupCourseId = null;
            $course->save();
        }
        $group = GroupCourse::all();
        foreach ($group as $item) {
            $count = Courses::where('groupCourseId', $item->id)->count();
            if ($count === 0) {
                $item->delete();
            } else if ($count === 1) {
                $co = Courses::where('groupCourseId', $item->id)->first();
                $co->groupCourseId = null;
                $co->save();
                $item->delete();
            }
        }
        return ['type' => 'success'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GroupCourse  $groupCourse
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        
    }
}
