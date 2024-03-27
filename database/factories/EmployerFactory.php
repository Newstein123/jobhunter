<?php

namespace Database\Factories;

use App\Helpers\Helper;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employer>
 */
class EmployerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $emails = [
            [
                'id' => 'minthetpaing.mysol@gmail.com',
                'text' => 'minthetpaing.mysol@gmail.com',
            ],
            [
                'id' => 'minthet.careers.sg@gmail.com',
                'text' => 'minthet.careers.sg@gmail.com',
            ],
            [
                'id' => 'mtp.employment.sg@gmail.com',
                'text' => 'mtp.employment.sg@gmail.com',
            ],
            [
                'id' => 'career.minthet.sg@gmail.com',
                'text' => 'career.minthet.sg@gmail.com',
            ],
            [
                'id' => 'seeker.minthet.sg@gmail.com',
                'text' => 'seeker.minthet.sg@gmail.com',
            ],
            [
                'id' => 'mtp.jobsearch.sg@gmail.com',
                'text' => 'mtp.jobsearch.sg@gmail.com',
            ],
        ];
        

        return [
            'name' => $this->faker->company(),
            'mail_address' => json_encode($emails),
            'reputation' => $this->faker->text(30),
            'job_portal' => $this->faker->randomElement(Helper::getJobPortals()),
            'country' => $this->faker->randomElement(Helper::getCountries())
        ];
    }
}
