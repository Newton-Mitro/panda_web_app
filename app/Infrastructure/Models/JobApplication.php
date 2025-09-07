<?php

namespace App\Infrastructure\Models;

use Database\Factories\JobApplicationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'career_id',
        'full_name',
        'email',
        'phone',
        'linkedin_url',
        'portfolio_url',
        'resume_path',
        'cover_letter_path',
        'why_choose',
        'highest_qualification',
        'experience_level',
        'expected_salary',
        'available_from',
        'status',
        'applied_via',
        'ip_address',
        'notes',
    ];

    // Add appended attributes
    protected $appends = ['resume_url', 'cover_letter_url'];

    /**
     * Relationship: Job Application belongs to a Career
     */
    public function career()
    {
        return $this->belongsTo(Career::class, 'career_id');
    }

    /**
     * Accessor: Full URL for resume
     */
    public function getResumeUrlAttribute(): ?string
    {
        return $this->resume_path ? url(Storage::url($this->resume_path)) : null;
    }

    /**
     * Accessor: Full URL for cover letter
     */
    public function getCoverLetterUrlAttribute(): ?string
    {
        return $this->cover_letter_path ? url(Storage::url($this->cover_letter_path)) : null;
    }

    /**
     * Factory
     */
    protected static function newFactory()
    {
        return JobApplicationFactory::new();
    }
}
