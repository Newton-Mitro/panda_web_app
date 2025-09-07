import { JobCircular } from './job_circular';

export interface JobApplication {
    id: number;
    career_id: number;
    career?: JobCircular; // optional relationship

    full_name: string;
    email: string;
    phone?: string | null;
    linkedin_url?: string | null;
    portfolio_url?: string | null;

    resume_path?: string | null;
    resume_url?: string | null;
    cover_letter_path?: string | null;
    cover_letter_url?: string | null;
    why_choose?: string | null;

    highest_qualification?: string | null;
    experience_level?: string | null;
    expected_salary?: number | null;
    available_from?: string | null; // ISO date string

    status: string | 'pending' | 'reviewed' | 'shortlisted' | 'interviewing' | 'offered' | 'hired' | 'rejected';

    applied_via?: string | null;
    ip_address?: string | null;
    notes?: string | null;

    created_at: string;
    updated_at: string;
}
