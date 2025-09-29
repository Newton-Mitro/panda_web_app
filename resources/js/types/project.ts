export interface Project {
    id: number;
    title: string;
    slug: string;
    description?: string;
    category?: any;
    source_code_link?: string;
    live_site_link?: string;
    start_date?: string;
    end_date?: string;
    gallery?: string[];
    media?: any;
    media_id?: number;
    category_id: number;
    status: string;

    created_at: string;
    updated_at: string;
}
