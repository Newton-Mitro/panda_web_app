<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePageRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'parent_id' => 'nullable|exists:pages,id',

            'sections' => 'array',
            'sections.*.id' => 'nullable|exists:page_sections,id',
            'sections.*.heading' => 'nullable|string|max:255',
            'sections.*.sub_heading' => 'nullable|string|max:255',
            'sections.*.button_text' => 'nullable|string|max:255',
            'sections.*.button_link' => 'nullable|string|max:255',
            'sections.*.content' => 'nullable|string',
            'sections.*.gallery' => 'nullable|string',
            'sections.*.media_id' => 'nullable|exists:media,id',
            'sections.*.content_type' => 'in:json_array,custom_html',
            'sections.*.sort_order' => 'integer',
        ];
    }
}

