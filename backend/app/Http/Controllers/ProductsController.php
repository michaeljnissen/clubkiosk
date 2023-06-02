<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;




class ProductsController extends Controller
{
    public function index()
    {
        return Product::all();
    }
 
    public function show(Product $product)
    {
        return $product;
    }
 
    public function store(Request $request)
    {
        /*if (Auth::user()->isAdmin())
        {*/
            
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'priceGross' => 'required',
                'tax' => 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'type' => 'error',
                    'message' => 'Name, Preis Brutto und Steuer müssen gesetzt sein.'//$validator->errors()
                ], 400);
            }

            $product = Product::create($request->all());
            return response()->json($product, 201);
        //}

        abort(403);
    
    }
 
    public function update(Request $request, Product $product)
    {
        if (Auth::user()->isAdmin())
        {
            $product->update($request->all());

            return response()->json($product, 200);
        }
 
        abort(403);
    }
 
    public function delete(Product $product)
    {

        if (Auth::user()->isAdmin())
        {

            $count = DB::table('order_items')->where('product_id', $product->id)->count();

            if ($count > 0) {
                return response()->json([
                    'type' => 'error',
                    'message' => 'Produkt konnte nicht gelöscht werden, da bereits Bestellungen mit dem Produkt verknüpft sind.',
                    'data' => $count
                ], 406);
            }

            $product->delete();

            return response()->json(null, 200);
        }
 
        abort(403);
    }
}
