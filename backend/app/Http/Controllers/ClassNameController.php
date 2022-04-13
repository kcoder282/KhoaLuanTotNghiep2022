<?php

namespace App\Http\Controllers;

use App\Models\className;
use Illuminate\Http\Request;

class ClassNameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return className::where('ClassIndexId', $request->ClassIndexId)->get();
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
     * @param  \App\Models\className  $className
     * @return \Illuminate\Http\Response
     */
    public function show(className $className)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\className  $className
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, className $className)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\className  $className
     * @return \Illuminate\Http\Response
     */
    public function destroy(className $className)
    {
        //
    }
}
