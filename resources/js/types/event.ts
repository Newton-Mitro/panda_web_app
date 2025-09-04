import { Media } from './media';

export interface Event {
    id: number;
    title: string;
    slug: string;
    description?: string;
    location?: string;
    start_date: string;
    end_date?: string | null;
    media_id?: number | null;
    status: 'Active' | 'Inactive';
    created_at: string;
    updated_at: string;

    media?: Media | null;
}
