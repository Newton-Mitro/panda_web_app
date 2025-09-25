import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Project } from '../../types/project';

interface ShowProjectProps {
    project: Project;
}

export default function Show({ project }: ShowProjectProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Projects', href: route('projects.index') },
        { title: '', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title || ''} />
            <div className="w-full space-y-6 p-6 md:w-4xl">
                <HeadingSmall title={project.title || ''} description="View project details" />

                {/* Project Details */}
                <div className="grid gap-6">
                    {/* Title & Slug */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="font-medium text-gray-700">Title</label>
                            <p>{project.title}</p>
                        </div>

                        <div className="grid gap-2">
                            <label className="font-medium text-gray-700">Slug</label>
                            <p>{project.slug}</p>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="grid gap-2">
                        <label className="font-medium text-gray-700">Category</label>
                        <p>{project.category?.name || '-'}</p>
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                        <label className="font-medium text-gray-700">Description</label>
                        <div className="prose" dangerouslySetInnerHTML={{ __html: project.description || '-' }} />
                    </div>

                    {/* Source Code Link */}
                    <div className="grid gap-2">
                        <label className="font-medium text-gray-700">Source Code Link</label>
                        <a href={project.source_code_link} target="_blank" className="text-blue-500 hover:underline">
                            {project.source_code_link || '-'}
                        </a>
                    </div>

                    {/* Live Site Link */}
                    <div className="grid gap-2">
                        <label className="font-medium text-gray-700">Live Site Link</label>
                        <a href={project.live_site_link} target="_blank" className="text-blue-500 hover:underline">
                            {project.live_site_link || '-'}
                        </a>
                    </div>

                    {/* Start Date */}
                    <div className="grid gap-2">
                        <label className="font-medium text-gray-700">Start Date</label>
                        <p>{project.start_date || '-'}</p>
                    </div>

                    {/* End Date */}
                    <div className="grid gap-2">
                        <label className="font-medium text-gray-700">End Date</label>
                        <p>{project.end_date || '-'}</p>
                    </div>

                    {/* Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="grid gap-2">
                            <label className="font-medium text-gray-700">Gallery</label>
                            <div className="flex flex-wrap gap-2">
                                {project.gallery.map((url, idx) => (
                                    <img key={idx} src={url} alt={`Gallery ${idx}`} className="h-24 rounded object-cover" />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Media */}
                    {project.media && (
                        <div className="grid gap-2">
                            <label className="font-medium text-gray-700">Media</label>
                            <img src={project.media.url} alt={project.title} className="h-48 w-48 rounded object-cover" />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
