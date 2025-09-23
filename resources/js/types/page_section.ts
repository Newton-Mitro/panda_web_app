import { Media } from './media';

export interface PageSection {
    id: number | null; // null for new sections
    page_id?: number;
    heading?: string | null;
    sub_heading?: string | null;
    button_text?: string | null;
    button_link?: string | null;
    json_array?: string | null;
    content?: string | null;
    gallery?: string | null;
    media_id?: number | null; // selected media
    media?: Media | null; // relation
    sort_order?: number;
    created_at?: string;
    updated_at?: string;
}
