<?php

namespace App\Infrastructure\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'media_id',
        'teacher_id',
        'name',
        'bio',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'designation',
        'department',
        'national_id_no',
        'religion',
        'address',
        'status',
    ];

    public function media()
    {
        return $this->belongsTo(Media::class);
    }
}
