import { Head } from '@inertiajs/react';
import React from 'react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Testimonial } from '../../types/testimonial';

interface ShowProps {
    testimonial: Testimonial;
}

const Show: React.FC<ShowProps> = ({ testimonial }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Testimonials', href: route('testimonials.index') },
        { title: testimonial.author_name, href: route('testimonials.show', testimonial.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Testimonial - ${testimonial.author_name}`} />
            <div className="p-6">
                <HeadingSmall title={testimonial.author_name} description={`Testimonial details`} />

                <div className="mt-6 space-y-4 rounded-md border p-4 dark:border-gray-700">
                    <p>
                        <strong>Designation:</strong> {testimonial.author_designation || '-'}
                    </p>
                    <p>
                        <strong>Company:</strong> {testimonial.company || '-'}
                    </p>
                    <p>
                        <strong>Rating:</strong> {testimonial.rating ? `${testimonial.rating} ⭐` : '-'}
                    </p>
                    <p>
                        <strong>Status:</strong> {testimonial.status}
                    </p>
                    <div>
                        <strong>Message:</strong>
                        <div className="prose dark:prose-invert mt-2" dangerouslySetInnerHTML={{ __html: testimonial.message }} />
                    </div>
                    {testimonial.media && (
                        <div>
                            <strong>Media:</strong>
                            <div className="mt-2">
                                <img src={testimonial.media.url} alt="Testimonial media" className="max-h-48 rounded-md" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
