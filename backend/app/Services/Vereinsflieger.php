<?php 
namespace App\Services;

use GuzzleHttp\Client;

class Vereinsflieger
{
    protected $accesstoken;
    protected $client;

    public function __construct()
    {
        $this->client = $client = new \GuzzleHttp\Client([
            'base_uri' => 'https://vereinsflieger.de',
            'timeout' => 5.0
        ]);

        $this->accesstoken = $this->getAccessToken();
        $this->apiLogin();
    }

    private function getAccessToken() {
        $token_response = $this->client->get("https://vereinsflieger.de/interface/rest/auth/accesstoken", ['http_errors' => false]);

        if($token_response->getStatusCode() != 200)
        {
            throw new \Exception("Fehler bei Verbindungsaufbau mit Vereinsflieger-API"); //503
        }

        try {
            $accesstoken = json_decode($token_response->getBody())->accesstoken;
        }
        catch(\Exception $e) {
            throw new \Exception("Fehler bei Verarbeitung des Accesstoken von Vereinsflieger.de"); // 500
        }
        
        return $accesstoken;
    }

    private function apiLogin() {

        $login_response = $this->client->post("https://vereinsflieger.de/interface/rest/auth/signin", [
            'form_params' => [
                'accesstoken' => $this->accesstoken,
                'username' => config('app.VF_USER_NAME'),
                'password' => md5(config('app.VF_USER_PW')),
                'appkey' => config('app.VF_APPKEY')
            ], 
            'http_errors' => false
        ]);

        if($login_response->getStatusCode() == 403) {
            throw new \Exception("Inkorrekte Vereinsflieger.de-Zugangsdaten");
        }
        else if($login_response->getStatusCode() != 200) {
            throw new \Exception("Sonstiger Fehler bei Vereinsflieger.de-Login");
        }
    }

    public function getUsers() {
        $memberlist_response = $this->client->post("https://vereinsflieger.de/interface/rest/user/list", [
            'form_params' => [
                'accesstoken' => $this->accesstoken
            ],
            'http_errors' => false
        ]);

        if($memberlist_response->getStatusCode() == 400)
        {
            throw new \Exception("Ungültige Anfrage bei Auslesen der Mitgliederliste"); // 401
        }
        
        else if($memberlist_response->getStatusCode() == 401)
        {
            throw new \Exception("Nicht authentifiziert für Auslesen der Mitgliederliste"); // 500
        }

        else if($memberlist_response->getStatusCode() != 200)
        {
            throw new \Exception("Sonstiger Fehler bei Auslesen der Mitgliederliste"); // 500
        }

        $members = json_decode($memberlist_response->getBody());

        return $members;
    }

    public function addAccountingTransaction($date, $value, $tax, $debit_account, $credit_account, $tax_account, $booking_text) {
                
        $response = $this->client->post("https://vereinsflieger.de/interface/rest/account/add", [
            'form_params' => [
                'accesstoken' => $this->accesstoken,
                'bookingdate' => $date,
                'value' => $value,
                'salestax' => $tax,
                'debitaccount' => $debit_account,
                'creditaccount' => $credit_account,
                'taxaccount' => $tax_account,
                'bookingtext' => $booking_text
            ],
            'http_errors' => false
        ]);


        if($response->getStatusCode() == 400)
        {
            $message = json_decode($response->getBody())->error;
            throw new \Exception("Ungültige Anfrage: $message"); // 401
        }
        
        else if($response->getStatusCode() == 401)
        {
            throw new \Exception("Nicht authentifiziert für das Anlegen einer neuen Buchung"); // 500
        }

        else if($response->getStatusCode() != 200)
        {
            throw new \Exception("Sonstiger Fehler bei Erstellen einer Buchung"); // 500
        }
    }

    public function logout() {
        $logout_response = $client->delete("https://vereinsflieger.de/interface/rest/auth/signout", [
            'form_params' => [
                'accesstoken' => $this->accesstoken
            ],
            'http_errors' => false
        ]);
    }
}

?>