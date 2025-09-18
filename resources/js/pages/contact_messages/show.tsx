import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { ContactMessage } from '../../types/contact_message';

interface ShowProps {
    message: ContactMessage;
}

export default function Show({ message }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Contact Messages', href: route('contact-messages.index') },
        { title: message.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Message from ${message.name}`} />
            <div className="space-y-6 p-6">
                <HeadingSmall title={`Message from ${message.name}`} description={message.subject || 'No Subject'} />

                <div className="max-w-4xl">
                    <p className="mb-2 text-gray-600">
                        <strong>Email:</strong> {message.email}
                    </p>
                    {message.phone && (
                        <p className="mb-2 text-gray-600">
                            <strong>Phone:</strong> {message.phone}
                        </p>
                    )}
                    <div className="mt-6 rounded-lg border p-4 shadow">
                        <p>{message.message}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
