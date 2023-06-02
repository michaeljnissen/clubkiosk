<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = ['number','placed_on', 'payment_method', 'user_id', 'total_gross', 'total_actual'];

    public function products()
    {
        return $this->hasMany('App\OrderItem');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

}
