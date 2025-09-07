import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import HeadingSmall from '../../components/heading-small';
import { Select } from '../../components/ui/select';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { JobApplication } from '../../types/job_application';
import { JobCircular } from '../../types/job_circular';
import { PaginationLink } from '../../types/pagination_link';

interface IndexProps {
    applications: {
        data: JobApplication[];
        links: PaginationLink[];
    };
    careers: JobCircular[];
    selectedCareer: number | null;
}

const Index: React.FC<IndexProps> = ({ applications, careers, selectedCareer }) => {
    const [careerFilter, setCareerFilter] = useState<string | null>(selectedCareer?.toString() || null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Job Applications', href: route('job_applications.index') },
    ];

    const deleteApplication = (id: number) => {
        const isDark = document.documentElement.classList.contains('dark');
        Swal.fire({
            title: 'Are you sure?',
            text: 'This application will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: isDark ? '#ef4444' : '#d33',
            cancelButtonColor: isDark ? '#3b82f6' : '#3085d6',
            background: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#f9fafb' : '#111827',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('job_applications.destroy', id), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Application has been deleted.',
                            icon: 'success',
                            background: isDark ? '#1f2937' : '#fff',
                            color: isDark ? '#f9fafb' : '#111827',
                        });
                    },
                });
            }
        });
    };

    const changeCareerFilter = (careerId: string) => {
        setCareerFilter(careerId);
        router.get(route('job_applications.index'), { career_id: careerId || undefined }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Job Applications" />
            <div className="p-6">
                <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row">
                    <HeadingSmall title="Job Applications" description="Manage all job applications" />

                    <div className="">
                        <Select
                            value={careerFilter || ''}
                            onChange={(e) => changeCareerFilter(e.target.value)}
                            options={[
                                { value: '', label: 'All Open Careers' },
                                ...careers.map((career) => ({ value: career.id.toString(), label: career.title })),
                            ]}
                        />
                    </div>
                </div>

                <div className="h-[calc(100vh-250px)] overflow-auto rounded border border-gray-200 dark:border-gray-700">
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 hidden bg-gray-50 md:table-header-group dark:bg-gray-800">
                            <tr>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Name</th>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Email</th>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">For Circular</th>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Status</th>
                                <th className="border-b border-gray-200 p-2 text-left dark:border-gray-700">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="flex flex-col md:table-row-group">
                            {applications.data.map((app) => (
                                <tr
                                    key={app.id}
                                    className="flex flex-col border-b border-gray-200 even:bg-gray-50 md:table-row md:flex-row dark:border-gray-700 dark:even:bg-gray-900"
                                >
                                    <td className="px-2 py-1">
                                        <label className="font-semibold text-gray-700 md:hidden dark:text-gray-300">Name</label>
                                        <p className="text-gray-900 dark:text-gray-100">{app.full_name}</p>
                                    </td>
                                    <td className="px-2 py-1">
                                        <label className="font-semibold text-gray-700 md:hidden dark:text-gray-300">Email</label>
                                        <p className="text-gray-900 dark:text-gray-100">{app.email}</p>
                                    </td>
                                    <td className="px-2 py-1">
                                        <label className="font-semibold text-gray-700 md:hidden dark:text-gray-300">For Circular</label>
                                        <p className="text-gray-900 dark:text-gray-100">{app.career?.title || '-'}</p>
                                    </td>
                                    <td className="px-2 py-1">
                                        <label className="font-semibold text-gray-700 md:hidden dark:text-gray-300">Status</label>
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                app.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200'
                                                    : app.status === 'reviewed'
                                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200'
                                                      : app.status === 'shortlisted'
                                                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200'
                                                        : app.status === 'interviewing'
                                                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-200'
                                                          : app.status === 'offered'
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
                                                            : app.status === 'hired'
                                                              ? 'bg-green-600 text-white dark:bg-green-700'
                                                              : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'
                                            }`}
                                        >
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-2 py-1">
                                        <label className="font-semibold text-gray-700 md:hidden dark:text-gray-300">Actions</label>
                                        <TooltipProvider>
                                            <div className="flex space-x-2">
                                                {/* View Icon */}
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link
                                                            href={route('job_applications.show', app.id)}
                                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            <Eye className="h-5 w-5" />
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>View Details</TooltipContent>
                                                </Tooltip>

                                                {/* Delete Icon */}
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button
                                                            onClick={() => deleteApplication(app.id)}
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

                {/* Pagination */}
                <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Showing {applications.data.length} results</span>
                    <div className="flex gap-1">
                        {applications.links.map((link, i) => (
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
