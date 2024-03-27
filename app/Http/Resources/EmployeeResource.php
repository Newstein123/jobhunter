<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'mail_address' => json_decode($this->mail_address),
            'job_portal' => $this->job_portal,
            'country' => $this->country,
            'position' => $this->position,
            'status' => $this->status,
        ];
    }
}
