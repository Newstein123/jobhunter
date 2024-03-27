<?php

namespace Database\Seeders;

use App\Models\CustomMail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomMailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $custom_mails = [
            [
                'mail' => 'minthetpaing376@gmail.com',
                'password' => 'rvtwrkbhdhdsubvb'
            ],
            [
                'mail' => 'minthetpaingdev@gmail.com',
                'password' => 'jxjvoljlcomxkodp'
            ],
            [
                'mail' => 'mtp.employment.sg@gmail.com',
                'password' => 'cnkdrtkpemxtsfhn'
            ],
            [
                'mail' => 'minthetpaing620@gmail.com',
                'password' => 'phscovccmxgwyrss'
            ],
        ];

        foreach ($custom_mails as $item) {
            CustomMail::create([
                'mail_address' => $item['mail'],
                'username' => $item['mail'],
                'password' => $item['password']
            ]);
        }
    }
}
