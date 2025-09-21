<?php

namespace App\Infrastructure\Models;

use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_of',
        'name',
        'slug',
        'description',
        'media_id',
        'parent_id',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class, 'category_id');
    }

    public static function generateUniqueSlug(string $name): string
    {
        $slug = \Illuminate\Support\Str::slug($name);
        $count = static::where('slug', 'LIKE', "{$slug}%")->count();

        return $count ? "{$slug}-{$count}" : $slug;
    }

    public function media()
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }


    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public static function types(): array
    {
        return ['Team', 'Leader', 'Student', 'Teacher', 'Doctor', 'Service', 'Product', 'Project', 'Event', 'Notice', 'Article'];
    }

    protected static function newFactory()
    {
        return CategoryFactory::new();
    }
}
