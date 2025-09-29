import { Media } from './media';

export interface HeroSlide {
    id: number;
    title?: string | null;
    subtitle?: string | null;
    button_text?: string | null;
    button_link?: string | null;
    media_id: number;
    media?: Media | null;
    sort_order: number;
    status: 'Active' | 'Inactive';
    created_at: string;
    updated_at: string;
}
