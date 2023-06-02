<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = \Faker\Factory::create();

        User::create([
            'firstname' => "Admin",
            'lastname' => "Admin",
            'email' => "admin.admin@admin.de",
            'password_required' => true,
            'password' => Hash::make("admin"),
            'role' => '["user", "admin"]',
            'balance' => "0",
            'rfid' => 23149397,
        ]);

        /*for ($i = 0; $i < 5; $i++) {
            User::create([
                'firstname' => $faker->firstName,
                'lastname' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'password_required' => $faker->boolean,
                'password' => Hash::make("test"),
                'role' => '["user"]',
                'balance' => "0",
                'rfid' => $faker->unique()->ean13,
                ]);
        }*/
    }
}
