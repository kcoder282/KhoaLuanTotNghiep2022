<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\infoAssignment;
use Illuminate\Http\Request;

class InfoAssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $assignment = Courses::where('ClassIndexId', $request->ClassIndexId)
            ->where('sem', $request->sem)->orWhere('semReal', $request->sem)->get();
        foreach ($assignment as $key => $item) {
            $info = infoAssignment::where('courseId', $item->id)
                ->where('classNameId', $request->classNameId)->first();
            if ($info === null) {
                $info = new infoAssignment();
                $info->courseId = $item->id;
                $info->classNameId = $request->classNameId;
                $info->save();
            }
            $assignment[$key]->id_info = $info->id;
            $assignment[$key]->leactuerId = $info->leactuerId;
            $assignment[$key]->assignment = $info->assignment;
            $assignment[$key]->request = $info->request;
            $assignment[$key]->note = $info->note;
            $assignment[$key]->classSize = $info->classSize;
            $assignment[$key]->theory_info = $info->theory;
            $assignment[$key]->practice_info = $info->practice;
        }
        return $assignment;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $r)
    {
        $info = infoAssignment::find($r->id_info);
        if ($info) {
            $info->leactuerId = $r->leactuerId;
            $info->assignment = $r->assignment;
            // $info->re = $r->re;
            $info->note = $r->note;
            $info->classSize = $r->classSize;
            $info->theory = $r->theory_info;
            $info->practice = $r->practice_info;
            return $info->save() ?
                ['type' => 'success'] : ['type' => 'error'];
        } else return ['type' => 'error'];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\infoAssignment  $infoAssignment
     * @return \Illuminate\Http\Response
     */
    public function show(infoAssignment $infoAssignment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\infoAssignment  $infoAssignment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, infoAssignment $infoAssignment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\infoAssignment  $infoAssignment
     * @return \Illuminate\Http\Response
     */
    public function destroy(infoAssignment $infoAssignment)
    {
        //
    }
}
