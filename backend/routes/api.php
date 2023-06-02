<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/*
 * AUTH
 */

Route::post('login','CustomAuthController@login');
Route::post('register','CustomAuthController@register');

/*
 * PRODUCTS
 */

Route::get('products', 'ProductsController@index');
Route::get('products/{product}', 'ProductsController@show');
Route::post('products','ProductsController@store');
Route::put('products/{product}','ProductsController@update');
Route::delete('products/{product}', 'ProductsController@delete');

 /*
  * USERS
  */

Route::get('users', 'UserController@index');
Route::get('users/{user}', 'UserController@show');
Route::post('users','UserController@store');
Route::put('users/{user}','UserController@update');
Route::post('users/synchronise','UserController@synchronise');

  
/*
 * ORDERS
 */

Route::get('orders', 'OrderController@index');
Route::get('orders/{order}', 'OrderController@show');
Route::post('orders','OrderController@store');

 /*
  * STOCK
  */

Route::post('stock','StockController@update');

/**
 * Finance
 */

Route::get('accounting/paymentRun','AccountingController@paymentRun');
Route::post('accounting/getVereinsfliegerUsersAccountingInfoByCSV','AccountingController@getVereinsfliegerUsersAccountingInfoByCSV');
Route::post('accounting/addVereinsfliegerAccountingTransaction','AccountingController@addVereinsfliegerAccountingTransaction');

 /*
  * OTHERS
  */

Route::options('/{any}', function(){ return ''; })->where('any', '.*');

