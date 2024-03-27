<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobRequest extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function sender()
    {
        return $this->belongsTo(CustomMail::class, 'sender_id', 'id');
    }

    public function receiver()
    {
        return $this->belongsTo(Employer::class, 'receipt_id', 'id');
    }

    public function resume()
    {
        return $this->belongsTo(Resume::class, 'resume_id', 'id');
    }
}
