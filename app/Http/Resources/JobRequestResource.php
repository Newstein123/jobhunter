<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobRequestResource extends JsonResource
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
            'sender' => $this->sender->mail_address,
            'receivers' => json_decode($this->receiver->mail_address),
            'resume' => $this->resume->name,
            'position' => $this->receiver->position,
            'status' => $this->status,
            'company_name' => $this->receiver->name,
            'mail_type' => $this->mail_type,
        ];
    }
}
