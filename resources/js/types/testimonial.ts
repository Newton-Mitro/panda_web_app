export interface Testimonial {
    id: number;
    author_name: string;
    author_designation: string | null;
    company: string | null;
    message: string;
    media_id: number | null;
    rating: number | null;
    status: 'Active' | 'Inactive';
    created_at: string;
    updated_at: string;

    // relations
    media?: any;
}
