<?php

namespace App\Infrastructure\Models;

use Database\Factories\StudentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'media_id',
        'student_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'religion',
        'guardian_name',
        'guardian_phone',
        'roll_number',
        'category_id',
        'birth_registration_no',
        'national_id_no',
        'address',
        'status',
    ];

    // Relationships
    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Helper to get full name
    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }

    protected static function newFactory()
    {
        return StudentFactory::new();
    }
}
