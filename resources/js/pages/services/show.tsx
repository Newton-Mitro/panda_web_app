import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Service } from '../../types/service';

interface Props {
    service: Service;
}

export default function Show({ service }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Services', href: route('services.index') },
        { title: service.title, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={service.title} />
            <div className="w-full space-y-6 p-6 md:w-4xl">
                <HeadingSmall title={service.title} />

                {/* Top section: main image + summary info */}
                <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                    {service.media && (
                        <img
                            src={service.media.url}
                            alt={service.title}
                            className="mb-4 flex-shrink-0 rounded object-cover md:float-left md:mb-0 md:h-64 md:w-64"
                        />
                    )}

                    <div className="flex-1 space-y-2">
                        <div className="text-gray-700 dark:text-gray-300">
                            <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Slug</div>
                            <div className="font-medium">{service.slug}</div>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">
                            <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Category</div>
                            <div className="font-medium">{service.category?.name || '-'}</div>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">
                            <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Status</div>
                            <div className="font-medium">{service.status}</div>
                        </div>
                        <div className="prose mt-2" dangerouslySetInnerHTML={{ __html: service.description || '-' }} />
                    </div>
                </div>

                {/* Icon Media */}
                {service.icon_media && (
                    <div className="mt-4">
                        <h3 className="mb-2 font-semibold">Icon</h3>
                        <img src={service.icon_media.url} alt="Icon" className="h-24 w-24 rounded object-cover" />
                    </div>
                )}

                {/* Gallery */}
                {service.gallery && service.gallery.length > 0 && (
                    <div className="mt-4">
                        <h3 className="mb-2 font-semibold">Gallery</h3>
                        <div className="flex flex-wrap gap-2">
                            {service.gallery.map((url, idx) => (
                                <img key={idx} src={url} alt={`Gallery ${idx}`} className="h-24 rounded object-cover" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
