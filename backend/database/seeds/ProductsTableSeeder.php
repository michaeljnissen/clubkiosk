<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = \Faker\Factory::create();

        Product::create([
            'name' => "Cola",
            'priceGross' => "1.00",
            'basePriceGross' => "2.00",
            'basePriceReference' => "Liter",
            'description' => $faker->paragraph(1),
            'color' => "black",
            'tax' => "0.07",
            'gtin' => 23149397,
            'active' => true
        ]);

        Product::create([
            'name' => "Fanta",
            'priceGross' => "1.00",
            'basePriceGross' => "2.00",
            'basePriceReference' => "Liter",
            'description' => $faker->paragraph(1),
            'color' => "orange",
            'tax' => "0.07",
            'gtin' => 23149397,
            'active' => true
        ]);


        Product::create([
            'name' => "Spezi",
            'priceGross' => "1.00",
            'basePriceGross' => "2.00",
            'basePriceReference' => "Liter",
            'description' => $faker->paragraph(1),
            'color' => "black",
            'tax' => "0.07",
            'gtin' => 23149397,
            'active' => true
        ]);

        Product::create([
            'name' => "Bier",
            'priceGross' => "1.00",
            'basePriceGross' => "2.00",
            'basePriceReference' => "Liter",
            'description' => $faker->paragraph(1),
            'color' => "brown",
            'tax' => "0.07",
            'gtin' => 23149397,
            'active' => true
        ]);



        /*for ($i = 0; $i < 50; $i++) {
            Product::create([
                'name' => $faker->name,
                'priceGross' => $faker->randomFloat(2, 0, 5),
                'basePriceGross' => $faker->randomFloat(2, 0, 5),
                'description' => $faker->paragraph(1),
                'color' => $faker->safeColorName,
                'tax' => $faker->randomFloat(2, 0, 1),
                'gtin' => $faker->ean13
            ]);
        }*/
    }
}
