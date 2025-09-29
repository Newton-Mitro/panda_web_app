import { Media } from './media';

export interface Category {
    id: number;
    category_of: string;
    name: string;
    slug: string;
    description?: string | null;
    media_id?: number | null;
    parent_id?: number | null;
    created_at: string;
    updated_at: string;

    // Relationships
    media?: Media | null;
    parent?: Category | null;
}
