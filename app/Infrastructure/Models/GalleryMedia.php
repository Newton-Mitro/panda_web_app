<?php

namespace App\Infrastructure\Models;

use Database\Factories\GalleryMediaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryMedia extends Model
{
    use HasFactory;

    protected $fillable = [
        'gallery_id',
        'media_id',
        'caption',
        'description',
    ];

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function gallery()
    {
        return $this->belongsTo(Gallery::class);
    }


    protected static function newFactory()
    {
        return GalleryMediaFactory::new();
    }
}
