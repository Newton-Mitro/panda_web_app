<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLikeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'article_id' => 'sometimes|exists:articles,id',
            'user_id' => 'sometimes|exists:users,id',
        ];
    }
}
