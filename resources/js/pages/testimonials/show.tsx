import { Head } from '@inertiajs/react';
import React from 'react';
import HeadingSmall from '../../components/heading-small';
import { Badge } from '../../components/ui/badge';
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
            <div className="space-y-6 p-6 md:w-6xl">
                {/* Heading */}
                <HeadingSmall
                    title={testimonial.author_name}
                    description={`${testimonial.author_designation || ''} ${testimonial.company ? `| ${testimonial.company}` : ''}`}
                />

                {/* Status Badge */}
                <div className="flex flex-wrap items-center gap-4">
                    <Badge variant={testimonial.status === 'Active' ? 'default' : 'secondary'} className="rounded-xl">
                        {testimonial.status}
                    </Badge>
                </div>

                {/* Media */}
                {testimonial.media?.url && (
                    <div className="my-4">
                        <img src={testimonial.media.url} alt={testimonial.author_name} className="max-h-64 rounded object-cover" />
                    </div>
                )}

                {/* Message */}
                <div
                    className="prose prose-sm mt-2 max-w-none dark:prose-invert [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                    dangerouslySetInnerHTML={{ __html: testimonial.message }}
                />

                {/* Rating */}
                {testimonial.rating !== null && (
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                        Rating: <span className="font-medium">{testimonial.rating} / 5</span>
                    </p>
                )}

                {/* Footer info */}
                <div className="mt-4 text-sm text-gray-500">
                    <p>Created at: {new Date(testimonial.created_at).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(testimonial.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
