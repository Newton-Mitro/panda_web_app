import { Media } from './media';

export interface Teacher {
    id: number;
    teacher_id: string; // Unique teacher identifier

    first_name: string;
    last_name?: string | null;

    email?: string | null;
    phone?: string | null;

    date_of_birth?: string | null; // ISO date string (e.g., "2025-09-15")
    gender?: 'MALE' | 'FEMALE' | 'OTHER' | null;

    designation?: string | null; // e.g., "Assistant Professor"
    department?: string | null; // e.g., "Mathematics"

    national_id_no?: string | null;

    religion?: 'ISLAM' | 'HINDUISM' | 'CHRISTIANITY' | 'BUDDHISM' | 'OTHER' | null;

    address?: string | null;
    status: 'Active' | 'Inactive';

    media_id?: number | null;
    media?: Media | null;

    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    deleted_at?: string | null; // If soft deletes are enabled
}
