import { User } from '.';
import { Category } from './category';
import { Media } from './media';

export interface Article {
    id: number;
    user_id: number;
    title: string;
    slug: string;
    content: string;
    media_id?: number | null;
    status: string | 'draft' | 'published' | 'archived';
    category_id: number;
    published_at?: string | null;
    created_at: string;
    updated_at: string;

    // Relations
    user?: User;
    category?: Category;
    media?: Media;
}
