import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import { Badge } from '../../components/ui/badge';
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
            <div className="space-y-6 p-6 md:w-6xl">
                {/* Heading */}
                <HeadingSmall
                    title={notice.title}
                    description={`Published on ${new Date(notice.publish_date).toLocaleDateString()}${
                        notice.expiry_date ? ` | Expires on ${new Date(notice.expiry_date).toLocaleDateString()}` : ''
                    }`}
                />

                {/* Category & Status */}
                <div className="flex flex-wrap items-center gap-4">
                    {notice.category && <p className="text-sm text-gray-500">Category: {notice.category.name}</p>}
                    <Badge variant={notice.status === 'Active' ? 'default' : 'secondary'} className="rounded-xl">
                        {notice.status}
                    </Badge>
                </div>

                {/* Media */}
                {notice.media && (
                    <div className="my-4">
                        {isPdf ? (
                            <div className="rounded border bg-gray-50 p-2 dark:bg-gray-800">
                                <a href={notice.media.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    View PDF
                                </a>
                            </div>
                        ) : (
                            <img src={notice.media.url} alt={notice.title} className="max-h-96 w-full rounded object-cover shadow-md" />
                        )}
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-sm max-w-none dark:prose-invert [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                    dangerouslySetInnerHTML={{ __html: notice.content || '' }}
                />

                {/* Footer info */}
                <div className="mt-4 text-sm text-gray-500">
                    <p>Created at: {new Date(notice.created_at).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(notice.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
        </AppLayout>
    );
}
