import { Category } from './category';
import { Media } from './media';

export interface Leader {
    id: number;
    name: string;
    designation: string;

    bio?: string | null;
    message?: string | null;

    media_id?: number | null; // FK to media table
    media?: Media | null;
    facebook_links?: string | null;
    twitter_links?: string | null;
    linkedin_links?: string | null;
    instagram_links?: string | null;

    email?: string | null;
    phone?: string | null;
    address?: string | null;

    category_id: number; // FK to categories table
    category?: Category | null;
    status: 'Active' | 'Inactive'; // default: Active

    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}
