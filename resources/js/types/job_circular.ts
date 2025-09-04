import { PaginationLink } from './pagination_link';

export interface JobCircular {
    id: number;
    title: string;
    slug: string;
    description?: string;
    requirements?: string;
    location?: string;
    salary_range?: string;
    deadline?: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedJobCircular {
    data: JobCircular[];
    links: PaginationLink[];
}
