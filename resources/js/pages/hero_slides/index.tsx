import { Head, Link, router } from '@inertiajs/react';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import React from 'react';
import Swal from 'sweetalert2';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem, SharedData } from '../../types';
import { HeroSlide } from '../../types/hero_slide';
import { PaginationLink } from '../../types/pagination_link';

interface PageProps extends SharedData {
    sliders: {
        data: HeroSlide[];
        links: PaginationLink[];
    };
}

const Index: React.FC<PageProps> = ({ sliders }) => {
    const deleteSlide = (id: number) => {
        const isDark = document.documentElement.classList.contains('dark');
        Swal.fire({
            title: 'Are you sure?',
            text: 'This hero slide will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: isDark ? '#ef4444' : '#d33',
            cancelButtonColor: isDark ? '#3b82f6' : '#3085d6',
            background: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#f9fafb' : '#111827',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('hero-sliders.destroy', id), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Hero slide has been deleted.',
                            icon: 'success',
                            background: isDark ? '#1f2937' : '#fff',
                            color: isDark ? '#f9fafb' : '#111827',
                        });
                    },
                    onError: (errors) => console.error(errors),
                });
            }
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hero Slides', href: route('hero-sliders.index') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hero Slides" />
            <div className="p-6">
                {/* Heading */}
                <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row">
                    <HeadingSmall title="Hero Slides" description="Manage hero slides" />
                </div>

                {/* Media Table */}
                <div className="h-[calc(100vh-320px)] space-y-8 overflow-auto">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {sliders.data.map((slide) => (
                            <div
                                key={slide.id}
                                className="relative rounded border border-gray-200 bg-white p-2 hover:border-blue-500 dark:border-gray-700 dark:bg-neutral-900 dark:hover:border-blue-400"
                            >
                                <div className="cursor-pointer" onClick={() => router.visit(route('hero-sliders.show', slide.id))}>
                                    <img src={slide.media?.url} alt={slide.media?.alt_text || 'media'} className="h-32 w-full rounded object-cover" />
                                    <p className="mt-2 truncate text-center text-xs text-gray-900 sm:text-sm dark:text-gray-100">{`ID #${slide.id}`}</p>
                                    <p className="mt-1 truncate text-center text-xs text-gray-700 sm:text-sm dark:text-gray-300">
                                        {slide.media?.file_type}
                                    </p>
                                </div>

                                {/* View, Edit, Delete Buttons */}
                                <div className="absolute top-2 right-2 flex gap-1">
                                    {/* View Button */}
                                    <button
                                        onClick={() => router.visit(route('hero-sliders.show', slide.id))}
                                        className="rounded bg-blue-600 p-1 shadow hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
                                    >
                                        <span className="sr-only">View</span>
                                        <EyeIcon className="h-3 w-3 text-white" />
                                    </button>

                                    {/* Edit Button */}
                                    <button
                                        onClick={() => router.visit(route('hero-sliders.edit', slide.id))}
                                        className="rounded bg-green-600 p-1 shadow hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600"
                                    >
                                        <span className="sr-only">Edit</span>
                                        <PencilIcon className="h-3 w-3 text-white" />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteSlide(slide.id)}
                                        className="rounded bg-red-600 p-1 shadow hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600"
                                    >
                                        <span className="sr-only">Delete</span>
                                        <Trash2Icon className="h-3 w-3 text-white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Showing {sliders.data.length} results</span>
                    <div className="flex gap-1">
                        {sliders.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`rounded-full px-3 py-1 text-sm transition-colors duration-150 ${
                                    link.active
                                        ? 'bg-blue-700 text-white dark:bg-blue-600 dark:text-white'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
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
