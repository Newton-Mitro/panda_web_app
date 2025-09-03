export interface Media {
    id: number;
    file_name: string;
    file_path: string;
    file_type: string;
    alt_text?: string | null;
    uploaded_by?: number | null;
    created_at: string;
    updated_at: string;
    url: string;
}
