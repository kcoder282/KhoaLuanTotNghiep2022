<?php

namespace App\Http\Controllers;

use App\Models\ClassIndex as ModelsClassIndex;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;

class ClassIndex extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return ModelsClassIndex::where('status', $request->status ?? 0)->orderBy('name')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $classIndex = isset($request->id) ? ModelsClassIndex::find($request->id) : new ModelsClassIndex();
        $classIndex->name = $request->name;
        $classIndex->beginYear = (new Carbon($request->year[0]))->year;
        $classIndex->endYear = (new Carbon($request->year[1]))->year;
        $classIndex->description = $request->description;
        if($classIndex->save())
        return ['status'=>'success', 'message'=> isset($request->id)? 'Update Education Program Successful!':'Create Education Program Successful!'];
        else
        return ['status'=>'error', 'message'=>'Error'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $classIndex = ModelsClassIndex::find($id);
        $classIndex->status = $request->status;
        return $classIndex->save()?
        ['status' => 'success', 'message' => $classIndex->status? 'Move to trash succcessful': 'Restore from trash successfully']:
        ['status' => 'error', 'message' => $classIndex->status ? 'Move to trash failed' : 'Restore from trash failed'];  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return ModelsClassIndex::find($id)->delete() ?
        ['status' => 'success', 'message' => 'Delete succcessful' ] :
        ['status' => 'error', 'message' => 'Delete failed']; 
    }
}
