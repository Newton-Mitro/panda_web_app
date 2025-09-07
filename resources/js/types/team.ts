import { Category } from './category';
import { Media } from './media';

export interface Team {
    id: number;
    name: string;
    designation: string;
    bio?: string | null;
    message?: string | null;
    department?: string | null;
    media_id?: number | null;
    media?: Media | null;
    category_id: number;
    category?: Category | null;
    facebook_links?: string | null;
    twitter_links?: string | null;
    linkedin_links?: string | null;
    instagram_links?: string | null;
    youtube_links?: string | null;
    whatsapp_links?: string | null;
    github_links?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    status: 'Active' | 'Inactive';
    created_at?: string;
    updated_at?: string;
}
