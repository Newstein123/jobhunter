<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function email()
    {
        return $this->belongsTo(CustomMail::class, 'custom_mail_id', 'id');
    }
}
