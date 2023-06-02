<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Order;

use Illuminate\Support\Facades\Storage;

use App\Services\Vereinsflieger;



class AccountingController extends Controller
{

    public function __construct(Vereinsflieger $vereinsflieger)
    {
        $this->vereinsflieger = $vereinsflieger;
    }


    /**
     * Create a CSV payment run
     */
    public function paymentRun(Request $request)
    {
        if (Auth::user()->isAdmin())
        {
            $csv = DB::transaction(function () {

                $csv = "email;name;balance\n";

                $users = User::all();

                $payment_run_info = array();
                
                foreach($users as $user) {
                    $user_accounting_info = new \stdClass();

                    $user_balance = DB::table("orders")->where("user_id", $user->id)->sum("total_gross");

                    if($user_balance != 0) {
                        $user_accounting_info->id = $user->id;
                        $user_accounting_info->email = $user->email;
                        $user_accounting_info->name = $user->firstname." ".$user->lastname;
                        $user_accounting_info->balance = $user_balance;
        
                        $payment_run_info[] = $user_accounting_info;
                    }
                }

                foreach($payment_run_info as $user_info) {
                    $csv .= "{$user_info->email};{$user_info->name};{$user_info->balance}\n";
                }

                // Do the Server-Abrechnung

                foreach($payment_run_info as $user_info) {
                    $new_order = new Order;
                    $new_order->number = 0;
                    $new_order->payment_method = "Abrechnung";
                    $new_order->user_id = $user_info->id;
                    $new_order->total_gross = -($user_info->balance);
                    $new_order->total_actual = -($user_info->balance);
                    $new_order->placed_on = date('Y-m-d H:i:s');
                    $new_order->save();

                    $user = User::find($user_info->id);
                    $user->balance = 0;
                    $user->save();
                }

                // Do the barabrechnung
                $bar_gross = DB::table("orders")->where("user_id", null)->sum("total_gross");
                $bar_actual = DB::table("orders")->where("user_id", null)->sum("total_actual");

                $new_order = new Order;
                $new_order->number = 0;
                $new_order->payment_method = "Abrechnung (Bar)";
                $new_order->user_id = null;
                $new_order->total_gross = -($bar_gross);
                $new_order->total_actual = -($bar_actual);
                $new_order->placed_on = date('Y-m-d H:i:s');
                $new_order->save();

                $csv.= "BARABRECHNUNG - WARENWERT;BARABRECHNUNG - WARENWERT;$bar_gross\n";
                $csv.= "BARABRECHNUNG - KASSENSTAND;BARABRECHNUNG - KASSENSTAND;$bar_actual\n";

                $filepath = date('Ymd_His').'_abrechnung.csv';

                Storage::disk('local')->put($filepath, $csv);

                return $csv;
            });

            return response()->json($csv, 201);
        }

        abort(403);
    
    }

    public function getVereinsfliegerUsersAccountingInfoByCSV(Request $request) {

        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        // Load CSV data into array
        $csv_file = fopen($request->file("csv"), "r");
        $data = [];
        while(($line = fgetcsv($csv_file, 0, ';', '"'))) {
            $data[] = $line;
        }

        // Get VF users
        try {
            $vf_members = (array) $this->vereinsflieger->getUsers();
        }

        catch(\Exception $e) {
            return  response()->json([
                'type' => 'error',
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }

        // Drop CSV headers
        array_shift($data);

        // Get only the "email" column from the VF users for simpler code
        $emails_only = array_column($vf_members, "email");

        // Prepare output array
        $output = array();

        foreach($data as $user_line) {
            $accounting_entry = new \stdClass();

            $accounting_entry->email = $user_line[0];
            $accounting_entry->name = $user_line[1];
            $accounting_entry->balance = $user_line[2];

            $pos_in_array = array_search($accounting_entry->email, $emails_only);

            // The user is also present in Vereinsflieger
            
            if($pos_in_array) {
                $accounting_entry->accounting_type = "VF";
                $accounts = $vf_members[$pos_in_array]->accounts;
                foreach ($accounts as $account) {
                    if ($account->accounttype == "Mitgliedskonto") {
                        $accounting_entry->account_no = $account->shortname;
                    }
                }

                if(!isset($accounting_entry->account_no)) {
                    $accounting_entry->accounting_type = "M";
                    $accounting_entry->remark = "E-Mail-Adresse in VF existent, aber kein Debitorenkonto gefunden.";
                }    
            }

            else {
                $accounting_entry->accounting_type = "M";
                $accounting_entry->remark = "Konto nicht gefunden - manuelle Abrechnung erforderlich.";
            }

            $output[] = $accounting_entry;
        }

        return response()->json($output, 200);
    }

    public function addVereinsfliegerAccountingTransaction(Request $request) {

        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        if (!$request->has("value") || !$request->has("tax") || !$request->has("debitAccount") || !$request->has("creditAccount") || !$request->has("taxAccount") || !$request->has("bookingText"))
        {
            return  response()->json([
                'type' => 'error',
                'message' => 'Please ensure you specified all necessary fields.'
            ], 400);    
        }

        $date = date("Y-m-d");
        $value = $request->input("value");
        $tax = $request->input("tax");
        $debit_account = $request->input("debitAccount");
        $credit_account = $request->input("creditAccount");
        $tax_account = $request->input("taxAccount");
        $account_reference = $request->input("accountReference");
        $account_reference_id = $request->input("accountReferenceId");
        $booking_text = $request->input("bookingText");

        try {
            $this->vereinsflieger->addAccountingTransaction($date, $value, $tax, $debit_account, $credit_account, $tax_account, $booking_text);
        }
        
        catch(\Exception $e) {
            return  response()->json([
                'type' => 'error',
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
