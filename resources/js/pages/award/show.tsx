import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Award } from '../../types/award';

interface Props {
    award: Award;
}

export default function Show({ award }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Awards', href: route('awards.index') },
        { title: award.title, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={award.title} />
            <div className="space-y-6 p-6 md:w-6xl">
                {/* Heading */}
                <HeadingSmall title={award.title} description={`Year: ${award.year}`} />

                {/* Media */}
                {award.media?.url && (
                    <div className="my-4">
                        <img src={award.media.url} alt={award.title} className="max-h-96 rounded object-cover shadow-md" />
                    </div>
                )}

                {/* Description */}
                <div
                    className="prose prose-sm max-w-none dark:prose-invert [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                    dangerouslySetInnerHTML={{ __html: award.description || '' }}
                />

                {/* Footer info */}
                <div className="mt-4 text-sm text-gray-500">
                    <p>Created at: {new Date(award.created_at).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(award.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
        </AppLayout>
    );
}
