import { PaginationLink } from './pagination_link';

export interface JobCircular {
    id: number;
    title: string;
    slug: string;
    description?: string;
    requirements?: string;
    responsibilities?: string;
    location?: string;
    is_remote: boolean;
    salary_range?: string;
    min_salary?: number;
    max_salary?: number;
    currency: string;
    benefits?: string[]; // JSON array from backend
    employment_type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'temporary';
    experience_level: 'entry' | 'junior' | 'mid' | 'senior' | 'lead';
    department?: string;
    job_function?: string;
    education_level?: string;
    deadline?: string;
    status: 'open' | 'closed' | 'draft';
    positions: number;
    applications_count: number;
    created_at: string;
    updated_at: string;
}

export interface PaginatedJobCircular {
    data: JobCircular[];
    links: PaginationLink[];
}
