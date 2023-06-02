<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


use App\Order;
use App\User;
use App\OrderItem;
use App\Product;


class OrderController extends Controller
{
    public function index()
    {
        //if (in_array("admin", json_decode(Auth::user()->role)))
        if (Auth::user()->isAdmin())
        {
            return response()->json(Order::with('user')->get(), 200);
        }

        if (Auth::id() != null)
        {
            $uid = Auth::id();
            return response()->json(Order::with('products')->where('user_id', $uid)->get(), 200);
        }

        abort(403);
    }
 
    public function show(Order $order)
    {        
        if (Auth::user()->isAdmin())
        {
            return response()->json(Order::with(['products', 'user'])->where('id', $order->id)->get()->first(), 200);
        }

        abort(403);
    }


    public function store(Request $request)
    {
        if (!$request->has('payment_method') || !$request->has('total_gross') || !$request->has('cart'))
        {
            return response()->json([
                'type' => 'error',
                'message' => 'Order cannot be processed as mandatory fields are missing.'
            ], 400);    
        }


        // Payment method: Barzahlung

        if ( $request->input('payment_method') == "bar" )
        {
            $order = Order::create([
                'number' => '1',
                'placed_on' => now(),
                'payment_method' => $request->input('payment_method'),
                'user_id' => null,
                'total_gross' => $request->input('total_gross'),
                'total_actual' => $request->input('total_actual')]);
                
            $products = $request->input('cart');

            foreach ( $products as $product )
            {
                $order_item = OrderItem::create([
                    'order_id' => $order->id,
                    'price_gross' => $product['produkt']['priceGross'],
                    'product_id' => $product['produkt']['id'],
                    'qty' => $product['menge'],
                    'name' => $product['produkt']['name'],
                    'tax' => $product['produkt']['tax'],
                ]);

                $warehouse_product = Product::find($product['produkt']['id']);
                $warehouse_product->stock -= $product['menge'];
                $warehouse_product->save();
            }

            return response()->json(null, 201);
        }

        // Payment method: User account

        if ( $request->input('payment_method') == "konto" )
        {
            // Get user data by ID
            $user = User::find($request->input('user'));

            // Authenticate if required
            if ($user->password_required)
            {
                if(!Auth::attempt(['email' => $user->email, 'password' => $request->input('password')]))
                {
                    return response()->json([
                        'type' => 'error',
                        'message' => 'Incorrect password.'
                    ], 401);            
                }
            }

            $order = Order::create([
                'number' => '1',
                'placed_on' => now(),
                'payment_method' => $request->input('payment_method'),
                'user_id' => $request->input('user'),
                'total_gross' => $request->input('total_gross'),
                'total_actual' => $request->input('total_gross')]);


            $products = $request->input('cart');

            foreach ( $products as $product )
            {
                $order_item = OrderItem::create([
                    'order_id' => $order->id,
                    'price_gross' => $product['produkt']['priceGross'],
                    'product_id' => $product['produkt']['id'],
                    'qty' => $product['menge'],
                    'name' => $product['produkt']['name'],
                    'tax' => $product['produkt']['tax'],
                ]);

                $warehouse_product = Product::find($product['produkt']['id']);
                $warehouse_product->stock -= $product['menge'];
                $warehouse_product->save();

            }

            $user->balance = ($user->balance - $request->input('total_gross'));
            $user->save();
    
        
            return response()->json(null, 201);
        }

        abort(400);
    }
}
