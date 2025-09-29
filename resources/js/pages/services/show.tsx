import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import { Badge } from '../../components/ui/badge';
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
            <div className="w-full space-y-6 p-6 md:w-6xl">
                <HeadingSmall title={service.title} description={service.slug} />

                {/* Top section: main image + summary info */}
                <div className="space-y-4">
                    {service.media && (
                        <img
                            src={service.media.url}
                            alt={service.title}
                            style={{
                                clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                            }}
                            className="float-left mt-2 mr-6 mb-4 h-72 w-72 border-6 bg-card object-cover transition-transform duration-300 group-hover:scale-105 md:h-96 md:w-96"
                        />
                    )}

                    {/* Wrapped text content */}
                    <div className="text-gray-700 dark:text-gray-300">
                        <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Category</div>
                        <div className="font-medium">{service.category?.name || '-'}</div>
                    </div>

                    <div className="text-gray-700 dark:text-gray-300">
                        <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Status</div>
                        <div className="">
                            <Badge variant={service.status === 'Active' ? 'default' : 'secondary'} className="mb-3 rounded-xl">
                                {service.status}
                            </Badge>
                        </div>
                    </div>

                    <div
                        className="prose prose-sm max-w-none text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                        dangerouslySetInnerHTML={{ __html: service.description || '-' }}
                    />
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
                    <div className="clear-both">
                        <h3 className="my-6 font-semibold">Gallery</h3>
                        <div className="flex flex-wrap gap-2">
                            {service.gallery.map((url, idx) => (
                                <img
                                    key={idx}
                                    src={url}
                                    alt={`Gallery ${idx}`}
                                    className="h-40 w-40 rounded object-cover"
                                    style={{
                                        clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
