import { Media } from './media';

export interface GalleryMediaItem {
    id?: number;
    gallery_id?: number;
    media_id: number | null;
    caption?: string;
    description?: string;
    media?: Media | null;
}

export interface Gallery {
    id: number;
    title: string;
    description?: string;
    media_id: number;
    media?: Media; // optional relation
    media_items?: GalleryMediaItem[]; // optional related media entries
}
