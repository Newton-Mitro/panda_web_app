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
            <div className="w-full space-y-6 p-6 md:w-4xl">
                <HeadingSmall title={award.title} description={award.year?.toString()} />

                {award.image && <img src={award.image.url} alt={award.title} className="mb-4 rounded object-cover md:h-64 md:w-64" />}

                <div>
                    <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Year</div>
                    <div className="font-medium">{award.year}</div>
                </div>

                <div className="prose mt-2" dangerouslySetInnerHTML={{ __html: award.description || '-' }} />
            </div>
        </AppLayout>
    );
}
