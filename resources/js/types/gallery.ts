import { Media } from './media';

export interface GalleryMediaItem {
    id?: number;
    gallery_id?: number;
    media_id: number | null;
    caption?: string;
    description?: string;
    created_at: string;
    updated_at: string;

    media?: Media | null;
}

export interface Gallery {
    id: number;
    title: string;
    description?: string;
    media_id: number;
    created_at: string;
    updated_at: string;

    media?: Media; // optional relation
    media_items?: GalleryMediaItem[]; // optional related media entries
}
