<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Services\Vereinsflieger;

use App\User;

use GuzzleHttp\Client;


class UserController extends Controller
{
    public function __construct(Vereinsflieger $vereinsflieger)
    {
        $this->vereinsflieger = $vereinsflieger;
    }


    public function index()
    {
        if (Auth::user() && Auth::user()->role == "admin")
        {
            return User::all();
        }

        return User::select('id', 'firstname', 'lastname', 'password_required')->where('active', true)->orderBy('lastname', 'asc')->get();
    }
 
    public function show(User $user)
    {        
        if (!Auth::user()->isAdmin() && Auth::user() != $user)
        {
            abort(403);
        }

        return response()->json($user, 200);
    }
 
    public function update(Request $request, User $user)
    {

        // Update any user if the user is admin 
        // or update the user if user->id is auth->id

        if (Auth::user()->isAdmin() || Auth::id() == $request->id)
        {
            $request_data = $request->all();

            if($request->has('password'))
            {
                $request_data['password'] = Hash::make($request->input('password'));
            }

            $user->update($request_data);

            return response()->json($user, 200);
        }

        abort(403);
    }

    /*
     * Deprecated - don't use anymore
     */ 

    public function synchronise(Request $request)
    { 
        try {
            $members = $this->vereinsflieger->getUsers();
        }

        catch(\Exception $e) {
            return  response()->json([
                'type' => 'error',
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }

        $i = 0;

        foreach ($members as $member) {

            if (!is_object($member)) {
                continue;
            }

            // Check if this member qualifies as active and has an email set

            if (
                $member->memberstatus == "aktiv" && 
                in_array("Segelflug aktiv", $member->roles) && 
                isset($member->email) &&
                isset($member->birthday) &&
                $member->email != "" &&
                $member->birthday != ""
            ) {
                // Check if user with email exists, else create

                if (User::where('email', $member->email)->count() == 0) {
                    $user = new User;

                    $user->firstname = $member->firstname;
                    $user->lastname = $member->lastname;
                    $user->email = $member->email;
                    $user->password_required = false;
                    $user->balance = 0;
                    $user->rfid = 0;
                    $user->role = '["user"]';
                    $user->password = Hash::make(str_replace(".", "", $member->birthday));

                    $user->save();

                    $i++;
                }
            }
        }

        return response()->json("$i Benutzer angelegt.", 200);


        // Logout

        $logout_response = $client->delete("https://vereinsflieger.de/interface/rest/auth/signout", [
            'form_params' => [
                'accesstoken' => $access_token
            ],
            'http_errors' => false
        ]);


    }
}
