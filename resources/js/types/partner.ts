export interface Partner {
    id: number;
    name: string;
    media_id: number | null;
    website: string | null;
    status: 'Active' | 'Inactive';
    created_at: string;
    updated_at: string;

    media?: any;
}
