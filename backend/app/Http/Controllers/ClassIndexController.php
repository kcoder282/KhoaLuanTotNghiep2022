<?php

namespace App\Http\Controllers;

use App\Models\ClassIndex;
use App\Models\className;
use App\Models\Courses;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ClassIndexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return ClassIndex::where('del', $request->del)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (isset($request->id))
            $classIndex = ClassIndex::find($request->id);
        else
            $classIndex = new ClassIndex();

        $classIndex->name = $request->name;
        $classIndex->beginYear = Carbon::parse($request->year[0])->year;
        $classIndex->endYear = Carbon::parse($request->year[1])->year;
        $classIndex->des = $request->des;
        $classIndex->ClassIndexId = $request->ClassIndexId;
        if ($classIndex->save()){
            if ($request->classNumber > 1)
                for ($i = 0; $i < $request->classNumber; $i++) {
                    $class = new className();
                    $class->ClassIndexId = $classIndex->id;
                    $class->name = $request->name . ($i + 1);
                    $class->save();
                }
            else {
                $class = new className();
                $class->ClassIndexId = $classIndex->id;
                $class->name = $request->name;
                $class->save();
            }
            return ['type'=>'success'];
        }else return ['type'=>'error'];
            

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClassIndex  $classIndex
     * @return \Illuminate\Http\Response
     */
    public function show(ClassIndex $classIndex)
    {
        return $classIndex;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassIndex  $classIndex
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClassIndex $classIndex)
    {
        if (isset($request->del)) {
            $classIndex->del = $request->del;
            return $classIndex->save() ? ['type' => 'success', 'message' => 'Chuyển file vào thùng rác thành công'] :
                ['type' => 'error', 'message' => 'Chuyển file vào thùng rác thất bại'];
        } else {
            $classIndex->sem = $request->sem;
            $classIndex->semThree = $request->semThree;
            return $classIndex->save() ?
                ['type' => 'success', 'message' => 'Cập nhật thông tin thành công'] :
                ['type' => 'error', 'message' => 'Cập nhật thông tin thất bại'];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClassIndex  $classIndex
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClassIndex $classIndex)
    {
        return $classIndex->delete() ? [
            'type' => 'success',
            'message' => 'Xóa CTĐT thành công'
        ] : [
            'type' => 'error',
            'message' => 'Xóa CTĐT thất bại!'
        ];
    }
    public function inforCourse($id)
    {
        $sum = Courses::where('ClassIndexId', $id)->count();
        return ['sum' => $sum];
    }
}
