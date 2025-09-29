import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import { Badge } from '../../components/ui/badge';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Event } from '../../types/event';

interface ShowProps {
    event: Event;
}

export default function Show({ event }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Events', href: route('events.index') },
        { title: event.title, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.title} />
            <div className="space-y-6 p-6 md:w-6xl">
                {/* Heading */}
                <HeadingSmall
                    title={event.title}
                    description={`Event dates: ${new Date(event.start_date).toLocaleDateString()}${
                        event.end_date ? ` → ${new Date(event.end_date).toLocaleDateString()}` : ''
                    }`}
                />

                {/* Status */}
                <div className="flex flex-wrap items-center gap-4">
                    <Badge variant={event.status === 'Active' ? 'default' : 'secondary'} className="rounded-xl">
                        {event.status}
                    </Badge>
                </div>

                {/* Media */}
                {event.media && (
                    <div className="my-4">
                        <img src={event.media.url} alt={event.title} className="max-h-96 w-full rounded object-cover shadow-md" />
                    </div>
                )}

                {/* Location */}
                {event.location && (
                    <div className="text-gray-700 dark:text-gray-300">
                        <h3 className="text-sm text-gray-500">Location</h3>
                        <p className="text-lg font-medium">{event.location}</p>
                    </div>
                )}

                {/* Description */}
                <div
                    className="prose prose-sm max-w-none dark:prose-invert [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                    dangerouslySetInnerHTML={{ __html: event.description || '' }}
                />

                {/* Footer info */}
                <div className="mt-4 text-sm text-gray-500">
                    <p>Created at: {new Date(event.created_at).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(event.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
        </AppLayout>
    );
}
