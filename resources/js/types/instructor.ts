import { Media } from './media';

export interface Instructor {
    id: number;
    media_id?: number | null;
    instructor_id: string;
    name: string;
    bio?: string | null;
    email: string;
    phone?: string | null;
    date_of_birth?: string | null; // ISO date string, e.g., "1990-01-01"
    gender?: 'MALE' | 'FEMALE' | 'OTHER' | null;
    designation?: string | null;
    department?: string | null;
    national_id_no?: string | null;
    religion?: 'ISLAM' | 'HINDUISM' | 'CHRISTIANITY' | 'BUDDHISM' | 'OTHER' | null;
    address?: string | null;
    status: 'Active' | 'Inactive';
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp

    // Optional nested relations
    media?: Media; // If you load the media relation
}
