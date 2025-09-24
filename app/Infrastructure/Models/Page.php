<?php

namespace App\Infrastructure\Models;

use App\Core\Traits\HasSlug;
use Database\Factories\PageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'title',
        'slug',
        'meta_title',
        'meta_description',
        'parent_id',
    ];

    public function sections()
    {
        return $this->hasMany(PageSection::class)->with('media')->orderBy('sort_order');
    }

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    protected static function newFactory()
    {
        return PageFactory::new();
    }
}
