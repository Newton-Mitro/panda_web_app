import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import { Badge } from '../../components/ui/badge';
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
            <div className="w-full space-y-6 p-6 md:w-6xl">
                {/* Heading */}
                <HeadingSmall title={project.title} description={project.slug} />

                {/* Top section: main image + summary info */}
                <div className="space-y-4">
                    {project.media?.url && (
                        <img
                            src={project.media.url}
                            alt={project.title}
                            style={{
                                clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                            }}
                            className="float-left mt-2 mr-6 mb-4 h-72 w-72 border-6 bg-card object-cover transition-transform duration-300 hover:scale-105 md:h-96 md:w-96"
                        />
                    )}

                    {/* Project info */}
                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <div>
                            <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Category</div>
                            <div className="font-medium">{project.category?.name || '-'}</div>
                        </div>

                        <div>
                            <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Status</div>
                            <div>
                                <Badge variant={project.status === 'Active' ? 'default' : 'secondary'} className="rounded-xl">
                                    {project.status}
                                </Badge>
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Start Date</div>
                            <div className="font-medium">{project.start_date || '-'}</div>
                        </div>

                        <div>
                            <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">End Date</div>
                            <div className="font-medium">{project.end_date || '-'}</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div
                        className="prose prose-sm mt-4 max-w-none text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                        dangerouslySetInnerHTML={{ __html: project.description || '-' }}
                    />
                </div>

                {/* Links */}
                <div className="mt-4 flex flex-wrap gap-4">
                    {project.source_code_link && (
                        <a
                            href={project.source_code_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
                        >
                            View Source
                        </a>
                    )}
                    {project.live_site_link && (
                        <a
                            href={project.live_site_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80"
                        >
                            Live Demo
                        </a>
                    )}
                </div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="clear-both mt-6">
                        <h3 className="mb-4 font-semibold">Gallery</h3>
                        <div className="flex flex-wrap gap-4">
                            {project.gallery.map((url, idx) => (
                                <img
                                    key={idx}
                                    src={url}
                                    alt={`Gallery ${idx + 1}`}
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
