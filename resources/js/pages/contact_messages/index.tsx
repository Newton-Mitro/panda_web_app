import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2 } from 'lucide-react';
import React from 'react';
import Swal from 'sweetalert2';
import HeadingSmall from '../../components/heading-small';
import { Button } from '../../components/ui/button';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { ContactMessage } from '../../types/contact_message';
import { PaginationLink } from '../../types/pagination_link';

interface NoticeProps {
    contactMessages: {
        data: ContactMessage[];
        links: PaginationLink[];
    };
}

const Index: React.FC<NoticeProps> = ({ contactMessages }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Contact Messages', href: route('contact-messages.index') },
    ];

    const deleteContactMessage = (id: number) => {
        const isDark = document.documentElement.classList.contains('dark');
        Swal.fire({
            title: 'Are you sure?',
            text: 'This contact message will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: isDark ? '#ef4444' : '#d33',
            cancelButtonColor: isDark ? '#3b82f6' : '#3085d6',
            background: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#f9fafb' : '#111827',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('contact-messages.destroy', id), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Contact message has been deleted.',
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
            <Head title="Contact Messages" />
            <div className="p-6">
                <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row">
                    <HeadingSmall title="Contact Messages" description="Manage your contact-messages" />
                    <Button onClick={() => router.visit(route('contact-messages.create'))} className="">
                        Create Contact Message
                    </Button>
                </div>

                <div className="h-[calc(100vh-250px)] overflow-auto rounded border border-gray-200 dark:border-gray-700">
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 hidden bg-gray-50 md:table-header-group dark:bg-gray-800">
                            <tr>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Name</th>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Email</th>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Subject</th>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="flex flex-col md:table-row-group">
                            {contactMessages.data.map((message) => (
                                <tr
                                    key={message.id}
                                    className="flex flex-col border-b border-gray-200 even:bg-gray-50 md:table-row md:flex-row dark:border-gray-700 dark:even:bg-gray-900"
                                >
                                    <td className="px-2 py-1">
                                        <label className="font-semibold text-gray-700 md:hidden dark:text-gray-300">Name</label>
                                        <p className="text-gray-900 dark:text-gray-100">{message.name}</p>
                                    </td>

                                    <td className="px-2 py-1">
                                        <label className="font-semibold text-gray-700 md:hidden dark:text-gray-300">Email</label>
                                        <p className="text-gray-900 dark:text-gray-100">{message.email || '-'}</p>
                                    </td>

                                    <td className="px-2 py-1">
                                        <label className="font-semibold text-gray-700 md:hidden dark:text-gray-300">Subject</label>
                                        <p className="text-gray-900 dark:text-gray-100">{message.subject}</p>
                                    </td>

                                    <td className="px-2 py-1">
                                        <label className="font-semibold text-gray-700 md:hidden dark:text-gray-300">Actions</label>
                                        <TooltipProvider>
                                            <div className="flex space-x-2">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link
                                                            href={route('contact-messages.show', message.id)}
                                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            <Eye className="h-5 w-5" />
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>View</TooltipContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button
                                                            onClick={() => deleteContactMessage(message.id)}
                                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Delete</TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </TooltipProvider>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Showing {contactMessages.data.length} results</span>
                    <div className="flex gap-1">
                        {contactMessages.links.map((link, i) => (
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
