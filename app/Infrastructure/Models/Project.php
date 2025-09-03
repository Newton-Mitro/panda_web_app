<?php

namespace App\Infrastructure\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'category',
        'source_code_link',
        'live_site_link',
        'start_date',
        'end_date',
        'gallery',
        'media_id',
        'category_id',
        'status',
    ];

    protected $casts = [
        'gallery' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function media()
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    public static function generateUniqueSlug(string $title): string
    {
        $slug = Str::slug($title);
        $count = static::where('slug', 'LIKE', "{$slug}%")->count();

        return $count ? "{$slug}-{$count}" : $slug;
    }

    protected static function newFactory()
    {
        return ProjectFactory::new();
    }
}
