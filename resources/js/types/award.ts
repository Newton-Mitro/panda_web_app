import { Media } from './media';

export interface Award {
    id: number;
    title: string;
    year: number;
    media_id?: number;
    description: string;
    created_at: string;
    updated_at: string;

    media?: Media | null;
}
