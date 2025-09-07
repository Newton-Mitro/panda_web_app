import { Head, Link } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import { Button } from '../../components/ui/button';
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

            <div className="space-y-8 p-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall title={event.title} description="Event details" />
                    <Button asChild variant="outline">
                        <Link href={route('events.edit', event.id)}>Edit Event</Link>
                    </Button>
                </div>

                <div className="space-y-6 rounded-lg border bg-white p-6 dark:bg-gray-900">
                    <div>
                        <h3 className="text-sm text-gray-500">Slug</h3>
                        <p className="text-lg font-medium">{event.slug}</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="text-sm text-gray-500">Location</h3>
                            <p className="text-lg">{event.location || '—'}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Dates</h3>
                            <p className="text-lg">
                                {event.start_date} → {event.end_date || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm text-gray-500">Status</h3>
                        <p>
                            <span
                                className={`rounded-full px-2 py-1 text-xs ${
                                    event.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                            >
                                {event.status}
                            </span>
                        </p>
                    </div>

                    {event.media && (
                        <div>
                            <h3 className="text-sm text-gray-500">Event Banner</h3>
                            <img src={event.media.url} alt={event.title} className="mt-2 max-w-md rounded-lg border" />
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm text-gray-500">Description</h3>
                        <div
                            className="prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: event.description || '',
                            }}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
