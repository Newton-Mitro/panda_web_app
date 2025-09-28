import { Head } from '@inertiajs/react';
import { useState } from 'react';
import PageLayout from '../../layouts/page-layout';
import { Project } from '../../types/project';
import PageBanner from './components/page-banner';

interface ProjectsPageProps {
    projects: Project[];
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }) => {
    // Extract unique categories
    const categories = Array.from(new Set(projects.map((p) => p.category?.name))).filter(Boolean) as string[];
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Filter projects
    const filteredProjects = selectedCategory === 'All' ? projects : projects.filter((p) => p.category?.name === selectedCategory);

    return (
        <>
            <Head title="Projects" />
            <PageLayout>
                {/* Hero */}
                <PageBanner title="Projects" subtitle="Discover our projects and explore the possibilities." />

                {/* Category Filter */}
                <section className="mx-auto my-12 max-w-6xl px-4 text-center">
                    <div className="inline-flex border-b">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`relative px-3 py-3 font-semibold transition-all duration-300 ${
                                selectedCategory === 'All'
                                    ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-blue-600'
                                    : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`relative px-3 py-3 font-semibold transition-all duration-300 ${
                                    selectedCategory === cat
                                        ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Projects List */}
                <section className="my-44">
                    <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6`}>
                        <div className="mt-12 flex flex-col md:gap-36">
                            {filteredProjects.map((project, index) => (
                                <div key={project.id} className="group flex cursor-pointer flex-col items-center md:relative md:flex-row">
                                    {index % 2 === 0 ? (
                                        <div className="flex w-full flex-col items-center md:relative md:flex-row">
                                            <img
                                                src={project.media?.url ?? 'https://via.placeholder.com/400'}
                                                alt={project.title}
                                                style={{ clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)' }}
                                                className="borderobject-cover z-10 mt-6 mb-6 h-72 w-72 border-6 bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96"
                                            />
                                            <div className="flex min-h-62 w-full flex-col justify-center rounded-2xl border-1 border-border bg-card p-6 md:ml-80 md:pl-20">
                                                <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                                                {project.start_date && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {project.start_date} {project.end_date ? `- ${project.end_date}` : ''}
                                                    </p>
                                                )}
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: project.description ?? '' }}
                                                    className="prose prose-sm mt-3 text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                                                />
                                                <div className="mt-4 flex space-x-2">
                                                    {project.source_code_link && (
                                                        <a
                                                            href={project.source_code_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
                                                        >
                                                            Source
                                                        </a>
                                                    )}
                                                    {project.live_site_link && (
                                                        <a
                                                            href={project.live_site_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="rounded-full bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700"
                                                        >
                                                            Live
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex w-full flex-col items-center md:relative md:flex-row">
                                            <div className="flex min-h-62 w-full flex-col justify-center rounded-2xl border-1 border-border bg-card p-6 text-right md:mr-80 md:pr-20">
                                                <div className="flex flex-col items-end">
                                                    <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                                                    {project.start_date && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {project.start_date} {project.end_date ? `- ${project.end_date}` : ''}
                                                        </p>
                                                    )}
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: project.description ?? '' }}
                                                        className="prose prose-sm mt-3 text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                                                    />
                                                    <div className="mt-4 flex space-x-2">
                                                        {project.source_code_link && (
                                                            <a
                                                                href={project.source_code_link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
                                                            >
                                                                Source
                                                            </a>
                                                        )}
                                                        {project.live_site_link && (
                                                            <a
                                                                href={project.live_site_link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="rounded-full bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700"
                                                            >
                                                                Live
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <img
                                                src={project.media?.url ?? 'https://via.placeholder.com/400'}
                                                alt={project.title}
                                                style={{ clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)' }}
                                                className="borderobject-cover right-0 z-10 mt-6 mb-6 h-72 w-72 border-6 bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default ProjectsPage;
