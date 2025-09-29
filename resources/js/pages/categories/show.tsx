import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import { Button } from '../../components/ui/button';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Category } from '../../types/category';

interface ShowProps {
    category: Category;
}

export default function Show({ category }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Categories', href: route('categories.index') },
        { title: category.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Category: ${category.name}`} />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6 md:w-6xl">
                <HeadingSmall title={category.name} description="Category details" />

                <div className="space-y-6">
                    {category.media && (
                        <div>
                            <p className="mb-1 text-sm font-medium text-muted-foreground">Image</p>
                            <img src={category.media.url} alt={category.media.file_name} className="h-96 rounded" />
                        </div>
                    )}

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Slug</p>
                        <p>{category.slug}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Category Of</p>
                        <p>{category.category_of}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Description</p>
                        <p>{category.description || '—'}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Parent</p>
                        <p>{category.parent ? category.parent.name : '—'}</p>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <a href={route('categories.edit', category.id)}>Edit</a>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
