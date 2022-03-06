<?php

namespace App\Http\Controllers;

use App\Models\ClassIndex;
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
        $classIndex->srcClassIndex = $request->srcClassIndex;

        return $classIndex->save() ? ['type' => 'success', 'message' => isset($request->id) ? 'Tạo mới CTĐT thành cong' : 'Cập nhật CTĐT thành công'] :
            ['type' => 'error', 'message' => 'Xảy ra lỗi khi thêm CTĐT mới'];
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
        if(isset($request->del)){
            $classIndex->del = $request->del;
            return $classIndex->save() ? ['type' => 'success', 'message' => 'Chuyển file vào thùng rác thành công'] :
            ['type' => 'error', 'message' => 'Chuyển file vào thùng rác thất bại'];
        }else{
            
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
        return $classIndex->delete()?[
            'type' => 'success',
            'message' => 'Xóa CTĐT thành công' 
        ]:[
            'type' => 'error',
            'message' => 'Xóa CTĐT thất bại!'
        ];
    }
}
