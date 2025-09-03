<?php

namespace App\Infrastructure\Models;

use App\Core\Traits\HasSlug;
use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory, HasSlug;

    // Make sure all fillable fields are included
    protected $fillable = [
        'title',
        'slug',
        'description',
        'gallery',
        'media_id',
        'category_id',
        'status',
    ];

    // Cast JSON fields correctly
    protected $casts = [
        'gallery' => 'array',
    ];

    // Relations
    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    // Factory
    protected static function newFactory()
    {
        return ServiceFactory::new();
    }


}
