<?php

namespace App\Http\Controllers;

use App\Models\lecturers;
use Illuminate\Http\Request;

class LecturersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return lecturers::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (isset($request->id)) {
            $lecturers = lecturers::find($request->id);
            if ($lecturers == null) $lecturers = new lecturers();
        } else
            $lecturers = new lecturers();

        $lecturers->code = $request->code;
        $lecturers->name = $request->name;
        $lecturers->birth = $lecturers->birth;
        $lecturers->phone = $lecturers->phone;
        $lecturers->mail = $lecturers->mail;
        $lecturers->isIT = $lecturers->isIT === false ? 0 : 1;
        return $lecturers->save() ?
            ['type' => 'success'] : ['type' => 'error'];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\lecturers  $lecturers
     * @return \Illuminate\Http\Response
     */
    public function show(lecturers $lecturers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\lecturers  $lecturers
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, lecturers $lecturers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\lecturers  $lecturers
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return lecturers::find($id)->delete() ?
            ['type' => 'success'] : ['type' => 'error'];
    }
}
