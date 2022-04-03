<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'userid'=>User::all()->random()->id,
            'date'=>$this->faker->unixTime(3),
            'description'=>$this->faker->sentence(3),
            'title'=>$this->faker->sentence(3),
        ];
    }
}
