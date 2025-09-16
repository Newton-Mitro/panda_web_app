import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Teacher } from '../../types/teacher';

interface ShowProps {
    teacher: Teacher;
}

export default function Show({ teacher }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Teams', href: route('teams.index') },
        { title: teacher.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={teacher.name} />
            <div className="w-full space-y-6 p-6 md:w-4xl">
                <HeadingSmall title={teacher.name} description={`Designation: ${teacher.designation}`} />

                {/* Main card: left info + right content */}
                <div className="flex flex-col gap-6 rounded-xl md:flex-row">
                    {/* Left: Image + basic info */}
                    <div className="flex flex-shrink-0 flex-col items-center space-y-4 md:w-80 md:items-start">
                        {/* Centered Info Card */}
                        <div className="mx-auto w-full max-w-md space-y-4 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                            {/* Profile Image */}
                            {teacher.media && (
                                <img src={teacher.media.url} alt={teacher.name} className="mx-auto mb-4 h-48 w-48 rounded-full object-cover" />
                            )}

                            {/* Info Fields */}
                            <div className="text-center text-gray-700 dark:text-gray-200">
                                {teacher.department && <div>{teacher.department}</div>}
                                {teacher.email && <div>{teacher.email}</div>}
                                {teacher.phone && <div>{teacher.phone}</div>}
                                {teacher.address && <div>{teacher.address}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Right: Bio & Message */}
                    <div className="flex-1 space-y-4 text-gray-700 dark:text-gray-300">
                        {teacher.bio && (
                            <div className="prose dark:prose-invert rounded-lg bg-gray-50 p-4 shadow-sm dark:bg-gray-800">
                                <strong>Bio:</strong>
                                <div dangerouslySetInnerHTML={{ __html: teacher.bio }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
