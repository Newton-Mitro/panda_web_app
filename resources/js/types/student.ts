import { Category } from './category';
import { Media } from './media';

export interface Student {
    id: number;
    student_id: string; // unique student identifier
    first_name: string;
    last_name?: string | null;

    email?: string | null;
    phone?: string | null;

    date_of_birth?: string | null; // ISO date string (e.g., '2025-09-15')
    gender?: 'MALE' | 'FEMALE' | 'OTHER' | null;

    religion?: 'ISLAM' | 'HINDUISM' | 'CHRISTIANITY' | 'BUDDHISM' | 'OTHER' | null;
    guardian_name?: string | null;
    guardian_phone?: string | null;

    roll_number: string;

    category_id?: number | null; // foreign key to categories table (class)
    category?: Category | null;

    birth_registration_no?: string | null;
    national_id_no?: string | null;

    address?: string | null;
    status: 'Active' | 'Inactive';

    media_id?: number | null;
    media?: Media | null;

    created_at: string; // timestamp (ISO format)
    updated_at: string; // timestamp (ISO format)
}
