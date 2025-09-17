<?php

namespace App\Infrastructure\Models;

use Database\Factories\LeaderFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leader extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'designation',
        'bio',
        'message',
        'media_id',
        'facebook_links',
        'twitter_links',
        'linkedin_links',
        'instagram_links',
        'email',
        'phone',
        'address',
        'category_id',
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

    protected static function newFactory()
    {
        return LeaderFactory::new();
    }
}
