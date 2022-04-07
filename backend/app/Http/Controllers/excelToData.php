<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\CoursesType;
use App\Models\GroupCourse;
use Illuminate\Http\Request;
use PHPUnit\TextUI\XmlConfiguration\Group;

class excelToData extends Controller
{
    public function Reset($idClassIndex)
    {
        try {
            Courses::where('ClassIndexId', $idClassIndex)->delete();
            CoursesType::where('ClassIndexId', $idClassIndex)->delete();
            GroupCourse::where('ClassIndexId', $idClassIndex)->delete(); 
        } catch (\Throwable $th) {}
        return ['type' => 'success'];
    }
    public function AddType($id, Request $request)
    {
        $str = '0123456789ABCDEF';
        try {
            foreach ($request->khoi as $item) {
                $data = new CoursesType();
                $data->name = $item;
                $data->color = '#' . substr(str_shuffle(str_repeat($str, 5)), 0, 3);
                $data->ClassIndexId = $id;
                $data->save();
            }
            return ['type' => 'success'];
        } catch (\Throwable $th) {
            return ['type' => 'error'];
        }
    }
    public function AddCourses($id, Request $request)
    {
        try {
            foreach ($request->mon as $item) {
                $data = new Courses();
                $data->code = $item['MÃ MH'];
                $data->name = str_replace('(*)', '', $item['Tên Học Phần']);
                $data->credits = intval($item['Số TC']);
                $data->store = !str_contains($item['Số TC'], '*');
                $data->theory = $item['LT'] ?? 0;
                $data->practice = $item['TH'] ?? 0;
                $data->sem = $item['Học kì'];
                $data->ClassIndexId = $id;
                $data->coursesType = CoursesType::where('name', $item['Khối kiến thức'])->where('ClassIndexId', $id)->first()->id;
                $data->save();
            }
            return ['type' => 'success'];
        } catch (\Throwable $th) {
            return ['type' => 'error'];
        }
    }
    public function AddCoursesDetail($id, Request $request)
    {
        foreach ($request->mega as $item) {
            $group = new GroupCourse();
            $group->ClassIndexId = $id;
            $group->sumCredit = $item['sumCredit'] ?? 0;
            $group->store = true;
            $group->save();
            foreach ($item['code'] as $c) {
                $course = Courses::where('code', $c)->where('ClassIndexId', $id)->first();
                $course->groupCourseId = $group->id;
                $course->save();
            }
        }
        foreach ($request->mon as $item) {
            $data = Courses::where('code', $item['MÃ MH'])->where('ClassIndexId', $id)->first();
            if (isset($item['TQ']))
                $data->prerequisite = Courses::where('code', $item['TQ'])->where('ClassIndexId', $id)->first()->id;
            if (isset($item['HT']))
                $data->learnFirst = Courses::where('code', $item['HT'])->where('ClassIndexId', $id)->first()->id;
            if (isset($item['SH']))
                $data->parallel = Courses::where('code', $item['SH'])->where('ClassIndexId', $id)->first()->id;
        }
        return ['type' => 'success'];
    }
}
