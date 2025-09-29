import { Head } from '@inertiajs/react';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Instructor } from '../../types/instructor';

interface ShowProps {
    instructor: Instructor;
}

export default function Show({ instructor }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Instructors', href: route('instructors.index') },
        { title: instructor.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={instructor.name} />
            <div className="w-full space-y-6 p-6 md:w-4xl">
                <div className="flex flex-col gap-6 rounded-xl md:flex-row">
                    {/* Left: Image + basic info */}
                    <div className="flex flex-shrink-0 flex-col items-center space-y-4 md:w-80 md:items-start">
                        <div className="mx-auto w-full max-w-md space-y-4 rounded-lg bg-card p-6">
                            {/* Profile Image */}
                            {instructor.media && (
                                <img src={instructor.media.url} alt={instructor.name} className="mx-auto mb-4 h-48 w-48 rounded-full object-cover" />
                            )}

                            {/* Info Fields */}
                            <div className="text-center text-gray-700 dark:text-gray-200">
                                {instructor.name && <div>{instructor.name}</div>}
                                {instructor.designation && <div>{instructor.designation}</div>}
                                {instructor.department && <div>{instructor.department}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Right: Bio & other details */}
                    <div className="flex-1 space-y-4 text-gray-700 dark:text-gray-300">
                        <div className="prose rounded-lg bg-card p-4 shadow-sm dark:prose-invert">
                            <strong>Information:</strong>
                            {instructor.email && <div>Email: {instructor.email}</div>}
                            {instructor.phone && <div>Phone: {instructor.phone}</div>}
                            {instructor.address && <div>{instructor.address}</div>}
                            {instructor.date_of_birth && <div>DOB: {instructor.date_of_birth}</div>}
                            {instructor.gender && <div>Gender: {instructor.gender}</div>}
                            {instructor.national_id_no && <div>NID: {instructor.national_id_no}</div>}
                            {instructor.religion && <div>Religion: {instructor.religion}</div>}
                            <div>Status: {instructor.status}</div>
                        </div>
                        {instructor.bio && (
                            <div className="prose rounded-lg bg-card p-4 shadow-sm dark:prose-invert">
                                <strong>Bio:</strong>
                                <div dangerouslySetInnerHTML={{ __html: instructor.bio }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
