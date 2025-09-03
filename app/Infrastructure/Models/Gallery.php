<?php

namespace App\Infrastructure\Models;

use Database\Factories\GalleryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'media_id'];

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function mediaItems()
    {
        return $this->hasMany(GalleryMedia::class);
    }


    protected static function newFactory()
    {
        return GalleryFactory::new();
    }
}
