<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Illuminate\Support\Facades\Auth;


class StockController extends Controller
{
    public function update(Request $request)
    {
        if (Auth::user()->isAdmin())
        {
            $products = $request->all();

            foreach ($products as $product)
            {
                $my_product = Product::find($product['id']);
                $my_product->stock = $product['stock'];
                $my_product->save();
            }

            return response()->json("Stocks updated successfully", 201);
        }

        abort(403);
    
    }
}
