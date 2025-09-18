export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    subject?: string | null;
    message: string;
    created_at: string; // ISO timestamp, e.g. "2025-09-18T10:30:00Z"
    updated_at: string; // ISO timestamp
}
