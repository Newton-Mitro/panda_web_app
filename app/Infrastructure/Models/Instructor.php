<?php

namespace App\Infrastructure\Models;

use Database\Factories\InstructorFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory;

    protected $table = 'instructors';

    /**
     * Fields that are mass assignable.
     */
    protected $fillable = [
        'media_id',
        'instructor_id',
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

    /**
     * Casts for proper data types.
     */
    protected $casts = [
        'date_of_birth' => 'date',
    ];

    /**
     * Relationship: An instructor may have one associated media item (profile picture, etc.).
     */
    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    protected static function newFactory()
    {
        return InstructorFactory::new();
    }
}
