export interface Contact {
    id: number;
    title: string;
    address: string;
    phone?: string;
    email?: string;
    opening_hours?: string;
    latitude?: number;
    longitude?: number;
    status: 'Active' | 'Inactive';
    created_at?: string;
    updated_at?: string;
}
