<?php

namespace App\Http\Controllers;

use App\Models\ClassIndex;
use Illuminate\Http\Request;

class ClassIndexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ClassIndex::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClassIndex  $classIndex
     * @return \Illuminate\Http\Response
     */
    public function show(ClassIndex $classIndex)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClassIndex  $classIndex
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClassIndex $classIndex)
    {
        //
    }
}
