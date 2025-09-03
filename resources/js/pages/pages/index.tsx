import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import Swal from 'sweetalert2';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem, SharedData } from '../../types';
import { Page } from '../../types/page';
import { PaginationLink } from '../../types/pagination_link';

interface PageProps extends SharedData {
    pages: {
        data: Page[];
        links: PaginationLink[];
    };
}

const Index: React.FC<PageProps> = ({ pages }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pages', href: '/admin/pages' },
    ];

    const deletePage = (id: number) => {
        const isDark = document.documentElement.classList.contains('dark');

        Swal.fire({
            title: 'Are you sure?',
            text: 'This page will be removed permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: isDark ? '#ef4444' : '#d33', // red-500 / red
            cancelButtonColor: isDark ? '#3b82f6' : '#3085d6', // blue-500 / blue
            background: isDark ? '#1f2937' : '#fff', // gray-800 / white
            color: isDark ? '#f9fafb' : '#111827', // gray-50 / gray-900
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('pages.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Removed!',
                            text: 'Page removed successfully.',
                            icon: 'success',
                            background: isDark ? '#1f2937' : '#fff',
                            color: isDark ? '#f9fafb' : '#111827',
                        });
                    },
                });
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pages" />
            <div className="space-y-4 p-6">
                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
                    <HeadingSmall title="Pages" description="Manage your website's pages" />
                    <Link
                        href={route('pages.create')}
                        className="inline-block rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
                    >
                        Create Page
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-auto rounded border border-gray-200 dark:border-gray-700">
                    <table className="w-full table-auto border-collapse">
                        <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Title</th>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Slug</th>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Meta Title</th>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TooltipProvider>
                                {pages.data.map((page) => (
                                    <tr key={page.id} className="border-b border-gray-200 even:bg-gray-50 dark:border-gray-700 dark:even:bg-gray-900">
                                        <td className="px-2 py-1 text-gray-900 dark:text-gray-100">{page.title}</td>
                                        <td className="px-2 py-1 text-gray-900 dark:text-gray-100">{page.slug}</td>
                                        <td className="px-2 py-1 text-gray-900 dark:text-gray-100">{page.meta_title}</td>
                                        <td className="px-2 py-1">
                                            <div className="flex space-x-2">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link
                                                            href={route('pages.show', page.id)}
                                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            <Eye className="h-5 w-5" />
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>View</TooltipContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link
                                                            href={route('pages.edit', page.id)}
                                                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                                        >
                                                            <Pencil className="h-5 w-5" />
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Edit</TooltipContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button
                                                            onClick={() => deletePage(page.id)}
                                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Delete</TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </TooltipProvider>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Showing {pages.data.length} results</span>
                    <div className="flex gap-1">
                        {pages.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`rounded-full px-3 py-1 text-sm ${
                                    link.active
                                        ? 'bg-blue-600 text-white dark:bg-blue-500'
                                        : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
