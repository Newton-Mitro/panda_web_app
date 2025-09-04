<?php

namespace App\Infrastructure\Models;

use Database\Factories\PartnerFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'media_id',
        'website',
        'status',
    ];

    /**
     * Relationship to Media
     */
    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    protected static function newFactory()
    {
        return PartnerFactory::new();
    }
}
