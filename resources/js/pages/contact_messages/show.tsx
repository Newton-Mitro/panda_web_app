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
                <HeadingSmall title={`Message from ${message.name}`} description={`Subject: ${message.subject || 'No Subject'}`} />

                <div className="space-y-6 md:w-6xl">
                    {/* Contact Info */}
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                        <div>
                            <h3 className="text-sm text-gray-500">Email</h3>
                            <p className="text-lg font-medium">{message.email}</p>
                        </div>

                        {message.phone && (
                            <div>
                                <h3 className="text-sm text-gray-500">Phone</h3>
                                <p className="text-lg font-medium">{message.phone}</p>
                            </div>
                        )}

                        {message.subject && (
                            <div>
                                <h3 className="text-sm text-gray-500">Subject</h3>
                                <p className="text-lg font-medium">{message.subject}</p>
                            </div>
                        )}
                    </div>

                    {/* Message */}
                    <div>
                        <h3 className="text-sm text-gray-500">Message</h3>
                        <div className="prose prose-sm mt-2 max-w-none dark:prose-invert">{message.message}</div>
                    </div>

                    {/* Footer info */}
                    <div className="mt-4 text-sm text-gray-500">
                        <p>Received at: {new Date(message.created_at).toLocaleString()}</p>
                        <p>Last updated: {new Date(message.updated_at).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
