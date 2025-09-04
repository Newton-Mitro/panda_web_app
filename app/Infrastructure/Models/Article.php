<?php

namespace App\Infrastructure\Models;

use Database\Factories\ArticleFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'article_categories');
    }

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'article_tags');
    }

    protected static function newFactory()
    {
        return ArticleFactory::new();
    }
}
