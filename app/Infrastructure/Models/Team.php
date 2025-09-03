<?php

namespace App\Infrastructure\Models;

use Database\Factories\TeamFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'designation',
        'bio',
        'message',
        'department',
        'media_id',
        'category_id',
        'facebook_links',
        'twitter_links',
        'linkedin_links',
        'instagram_links',
        'youtube_links',
        'pinterest_links',
        'tiktok_links',
        'snapchat_links',
        'whatsapp_links',
        'telegram_links',
        'github_links',
        'discord_links',
        'email',
        'phone',
        'address',
        'status',
    ];

    protected $casts = [
        'content' => 'array',
        'gallery' => 'array',
    ];

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
        return TeamFactory::new();
    }
}
