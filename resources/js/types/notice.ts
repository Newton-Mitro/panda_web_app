export interface Notice {
    id: number;
    title: string;
    slug: string;
    content: string | null;
    publish_date: string;
    expiry_date: string | null;
    media_id: number | null;
    category_id: number | null;
    status: 'Active' | 'Inactive';
    created_at: string;
    updated_at: string;

    // optional relations
    media?: any;
    category?: any;
}
