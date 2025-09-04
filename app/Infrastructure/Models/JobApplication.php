<?php

namespace App\Infrastructure\Models;

use Database\Factories\JobApplicationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return JobApplicationFactory::new();
    }
}
