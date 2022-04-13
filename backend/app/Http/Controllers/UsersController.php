<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('username', $request->username)
        ->where('password', md5($request->password))->first();
        if($user){
            $user->token = md5(uniqid($user->username, true));
            $user->save();
            return $user;
        }else return ['id'=>0];
        
    }
    public function user(Request $request)
    {   
        return $request->user;
    }
    public function addUser(Request $request){
        $user = new User();
        $user->username = $request->username;
        $user->password = md5($request->password);
        $user->mail = $request->mail;
        $user->token = '';
        return $user->save()?['type'=>'success']:['type'=>'error'];
    }
    public function delUser(Request $request)
    {
        
    }
    public function changeUser(Request $request)
    {
        $user = User::find($request->id);
        $user->password = md5($request->password);
        return $user->save()?['type'=>'success']:['type'=>'error'];
    }
    public function listUser(Request $request)
    {
        return User::all();
    }
}
