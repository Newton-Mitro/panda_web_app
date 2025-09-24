import { Head } from '@inertiajs/react';
import React from 'react';
import HeadingSmall from '../../components/heading-small';
import { Button } from '../../components/ui/button';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Gallery } from '../../types/gallery';

interface ShowProps {
    gallery: Gallery;
}

const Show: React.FC<ShowProps> = ({ gallery }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Galleries', href: route('galleries.index') },
        { title: gallery.title, href: '' },
    ];

    const renderMedia = (url: string, alt: string) => {
        if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
            return (
                <video controls className="max-h-96 rounded">
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        } else if (url.endsWith('.pdf')) {
            return (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    View PDF
                </a>
            );
        } else {
            return <img src={url} alt={alt} className="max-h-96 rounded object-cover" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={gallery.title} />
            <div className="h-[calc(100vh-100px)] space-y-6 overflow-auto p-6">
                <div className="w-full md:w-4xl">
                    <HeadingSmall title={gallery.title} description={gallery.description} />

                    {/* Main Media */}
                    {gallery.media && (
                        <div className="my-6">
                            <h2 className="mb-2 text-lg font-semibold">Gallery Cover</h2>
                            <div className="rounded-md">{renderMedia(gallery.media.url, gallery.media.alt_text || gallery.title)}</div>
                        </div>
                    )}

                    {/* Gallery Images */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Gallery Images</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {gallery.media_items?.length ? (
                                gallery.media_items.map((item, index) => (
                                    <div key={index} className="rounded-md border p-2">
                                        {item.media ? (
                                            renderMedia(item.media.url, item.media.alt_text || item.caption || `Media ${index + 1}`)
                                        ) : (
                                            <div className="text-sm text-neutral-500">No media selected</div>
                                        )}
                                        {item.caption && <p className="mt-1 font-medium">{item.caption}</p>}
                                        {item.description && (
                                            <p className="text-sm text-neutral-600">
                                                {item.description.length > 100 ? `${item.description.slice(0, 100)}…` : item.description}
                                            </p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-neutral-500">No gallery media available.</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button type="button" onClick={() => history.back()}>
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
