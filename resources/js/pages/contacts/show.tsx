import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Contact } from '../../types/contact';

interface ShowProps {
    contact: Contact;
}

export default function Show({ contact }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Contacts', href: route('contacts.index') },
        { title: contact.title, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={contact.title} />
            <div className="space-y-6 p-6">
                <HeadingSmall title={contact.title} description={contact.address} />

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <p>
                            <strong>Phone:</strong> {contact.phone || '-'}
                        </p>
                        <p>
                            <strong>Email:</strong> {contact.email || '-'}
                        </p>
                        <p>
                            <strong>Opening Hours:</strong> {contact.opening_hours || '-'}
                        </p>
                        <p>
                            <strong>Status:</strong> {contact.status}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
