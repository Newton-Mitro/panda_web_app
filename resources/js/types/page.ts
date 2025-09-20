import { PageSection } from './page_section';

export interface Page {
    id: number;
    title: string;
    slug: string;
    image?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
    sections: PageSection[];
    created_at: string;
    updated_at: string;
}
