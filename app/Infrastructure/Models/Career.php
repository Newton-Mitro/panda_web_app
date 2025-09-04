<?php

namespace App\Infrastructure\Models;

use Database\Factories\CareerFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Career extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'requirements',
        'location',
        'salary_range',
        'deadline',
        'status',
        'media_id',
    ];

    protected $casts = [
        'benefits' => 'array', // <-- ensures JSON is converted to PHP array automatically
        'is_remote' => 'boolean',
        'deadline' => 'date:Y-m-d',
    ];

    /**
     * Optional: A career can have many applications.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    /**
     * Scope for open careers
     */
    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }

    protected static function newFactory()
    {
        return CareerFactory::new();
    }
}
