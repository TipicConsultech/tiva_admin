<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'multi_enquiry';

    // Specify the attributes that are mass assignable
    protected $fillable = [
        'name',
        'email',
        'contact_number',
        'message',
        'type',
        'status',
        'updated_by'
    ];

    // Optionally, if you want to disable timestamps
    // public $timestamps = false;

    // Optionally, you can add custom methods or relationships here
}
