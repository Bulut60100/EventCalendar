<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = $request->validate([
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8',
        ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'name' => $user->name,
                'id' => $user->id,
                'token' => $token,
                'message' => 'Kayit basarili'
            ]);

    }


    public function login(Request $request){
        $validator = $request->validate([
            'email' => 'required|email|max:191',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 401,
                'message' => 'Kimlik bilgileri yanlış'
            ]);
        }
        else{
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'name' => $user->name,
                'id' => $user->id,
                'token' => $token,
                'message' => 'Giriş Başarili'
            ]);
        }
    }


    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Çıkış Başarili'
        ]);
    }


}
