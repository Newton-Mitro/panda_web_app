import { Head, Link } from '@inertiajs/react';
import { CalendarIcon, TagIcon, UserIcon } from 'lucide-react';
import HeadingSmall from '../../components/heading-small';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
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
                <section className="max-w-3xl">
                    <div className="">
                        {article.media?.url && <img src={article.media.url} alt={article.title} className="h-64 object-cover" />}
                        <div className="space-y-4 py-6">
                            {/* Category */}
                            {article.category && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <TagIcon size={14} />
                                    {article.category.name}
                                </Badge>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl font-bold text-foreground">{article.title}</h1>

                            {/* Meta info */}
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <UserIcon size={14} /> User #{article.user_id}
                                </span>
                                {article.published_at && (
                                    <span className="flex items-center gap-1">
                                        <CalendarIcon size={14} /> {new Date(article.published_at).toLocaleDateString()}
                                    </span>
                                )}
                                <span>Status: {article.status}</span>
                            </div>

                            <Separator />

                            {/* Content */}
                            <article className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.content }} />
                        </div>
                    </div>
                </section>

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
