<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
use Validator;
use JWTFactory;
use JWTAuth;
use App\Services\Vereinsflieger;

class CustomAuthController extends Controller
{
    public function __construct(Vereinsflieger $vereinsflieger)
    {
        $this->vereinsflieger = $vereinsflieger;
    }

    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password'=> 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'type' => 'error',
                'message' => 'Fehlerhafte Angaben'//$validator->errors()
            ], 400);
        }

        $credentials = $request->only('email', 'password');
        
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'type' => 'error',
                    'message' => 'Ungültige Logindaten.'
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Login successful',
            'data' => compact('token')
        ], 200);

    }

    public function register(Request $request)
    {

        if(!$request->has('method')) {
            return  response()->json([
                'type' => 'error',
                'message' => 'Registration method not specified.'
            ], 401);    
        }

        $method = $request->input('method');

        if($method == "vereinsflieger") {
            if(!$request->has('email') || !$request->has('password') || !$request->has('password_required'))
            {
                return  response()->json([
                    'type' => 'error',
                    'message' => 'Please ensure you specified all necessary fields.'
                ], 401);    
            }

            $email = $request->input('email');
            $password = $request->input('password');
            $password_required = $request->input('password_required');

            // Get data from Vereinsflieger
            $users = $this->vereinsflieger->getUsers();
            $found = false;

            // Search user in users
            foreach ($users as $user) {
                // Some array entries may not contain an email address
                if(!isset($user->email)) {
                    continue;
                }

                if($user->email == $email) {
                    $firstname = $user->firstname;
                    $lastname = $user->lastname;   
                    $found = true;
                }
            }
            
            // Exit if the user is not present in vereinsflieger
            if(!$found) {
                return  response()->json([
                    'type' => 'error',
                    'message' => 'User for given e-mail address was not found in Vereinsflieger.'
                ], 401); 
            }
        }

        else {
            if(!$request->has('firstname') || !$request->has('lastname') || !$request->has('email') || !$request->has('password') || !$request->has('password_required'))
            {
                return  response()->json([
                    'type' => 'error',
                    'message' => 'Please ensure you specified all necessary fields.'
                ], 401);    
            }

            $firstname = $request->input('firstname');
            $lastname = $request->input('lastname');
            $email = $request->input('email');
            $password = $request->input('password');
            $password_required = $request->input('password_required');
        }

        // Add the user

        try
        {
            $user = new User();
            $user->password = Hash::make($password);
            $user->firstname = $firstname;
            $user->lastname = $lastname;
            $user->email = $email;
            $user->balance = 0;
            $user->rfid = 0;
            $user->role = '["user"]';
            $user->password_required = $password_required;
            $user->save();
    
        }
        catch (\Exception $e)
        {
            return  response()->json([
                'type' => 'error',
                'message' => 'Registration failed: '.$e
            ], 400);
        }

        $token = JWTAuth::fromUser($user);

        return  response()->json([
            'type' => 'success',
            'message' => 'User registered',
            'data' => compact('token')
        ], 200);

    }


    //
}
