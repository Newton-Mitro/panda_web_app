<?php

namespace App\Infrastructure\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'description', 'price', 'media_id', 'status'];

    protected $casts = [
        'content' => 'array',
        'gallery' => 'array',
    ];

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    protected static function newFactory()
    {
        return ProductFactory::new();
    }
}
