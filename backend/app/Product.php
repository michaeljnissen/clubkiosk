<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $table = "products"; 
    
    protected $fillable = [
        'id', 'name', 'priceGross', 'basePriceGross', 'basePriceReference', 'description', 'color', 'tax', 'gtin', 'stock', 'active'
    ];
}
