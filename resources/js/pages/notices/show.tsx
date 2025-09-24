import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Notice } from '../../types/notice';

interface ShowProps {
    notice: Notice;
}

export default function Show({ notice }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Notices', href: route('notices.index') },
        { title: notice.title, href: '' },
    ];

    const isPdf = notice.media?.url?.toLowerCase().endsWith('.pdf');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={notice.title} />
            <div className="space-y-6 p-6">
                <HeadingSmall
                    title={notice.title}
                    description={`Published on ${notice.publish_date}${notice.expiry_date ? ` | Expires on ${notice.expiry_date}` : ''}`}
                />

                {/* Category */}
                {notice.category && <p className="text-sm text-gray-500">Category: {notice.category.name}</p>}

                {/* Media */}
                {notice.media && (
                    <div className="my-4">
                        {isPdf ? (
                            <div className="rounded border p-2">
                                <a href={notice.media.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    View PDF
                                </a>
                            </div>
                        ) : (
                            <img src={notice.media.url} alt={notice.title} className="max-h-96 rounded" />
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: notice.content || '' }} />

                <p className="text-sm text-gray-500">Status: {notice.status}</p>
            </div>
        </AppLayout>
    );
}
