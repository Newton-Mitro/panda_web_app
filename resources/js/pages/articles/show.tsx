import { Head, Link } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Article } from '../../types/article';

interface ShowProps {
    article: Article;
}

export default function Show({ article }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Articles', href: route('articles.index') },
        { title: article.title, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={article.title} />
            <div className="h-[calc(100vh-100px)] space-y-6 overflow-auto p-6">
                <HeadingSmall title={article.title} description="Article details" />

                {/* Meta */}
                <div className="rounded-lg border bg-white p-6 dark:bg-gray-900">
                    <div className="mb-4 flex flex-col gap-2 text-sm text-gray-600 md:flex-row md:items-center md:justify-between dark:text-gray-400">
                        <div className="flex gap-4">
                            <span>
                                <strong>Category:</strong> {article.category?.name || '-'}
                            </span>
                            <span>
                                <strong>Status:</strong>{' '}
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                        article.status === 'published'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
                                            : article.status === 'draft'
                                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200'
                                              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                                    }`}
                                >
                                    {article.status}
                                </span>
                            </span>
                        </div>
                        {article.published_at && (
                            <span>
                                <strong>Published at:</strong> {new Date(article.published_at).toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Media */}
                    {article.media && (
                        <div className="mb-4">
                            <img src={article.media.url} alt={article.title} className="max-h-96 w-full rounded-md object-cover shadow" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Link href={route('articles.edit', article.id)} className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Edit
                    </Link>
                    <Link href={route('articles.index')} className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
                        Back to Articles
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
