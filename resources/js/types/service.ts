import { Category } from './category';

export interface Service {
    id: number;
    title: string;
    slug: string;
    description?: string | null;
    gallery?: string[];
    icon_media_id?: number | null;
    media_id?: number | null;
    category_id: number;
    status?: string | null;
    created_at: string;
    updated_at: string;

    media?: any; // relation for media
    icon_media?: any; // relation for icon_media
    category?: Category | null;
}
