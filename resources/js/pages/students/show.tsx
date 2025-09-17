import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Student } from '../../types/student';

interface ShowProps {
    student: Student;
}

export default function Show({ student }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Students', href: route('students.index') },
        { title: student.first_name + (student.last_name ? ` ${student.last_name}` : ''), href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${student.first_name} ${student.last_name || ''}`} />
            <div className="w-full space-y-6 p-6 md:w-4xl">
                <HeadingSmall title={`${student.first_name} ${student.last_name || ''}`} description={`Roll Number: ${student.roll_number}`} />

                <div className="flex flex-col gap-6 rounded-xl md:flex-row">
                    {/* Left: Profile Image + basic info */}
                    <div className="flex flex-shrink-0 flex-col items-center space-y-4 md:w-80 md:items-start">
                        <div className="mx-auto w-full max-w-md space-y-4 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                            {/* Profile Image */}
                            {student.media && (
                                <img
                                    src={student.media.url}
                                    alt={`${student.first_name} ${student.last_name || ''}`}
                                    className="mx-auto mb-4 h-48 w-48 rounded-full object-cover"
                                />
                            )}

                            {/* Info Fields */}
                            <div className="space-y-1 text-center text-gray-700 dark:text-gray-200">
                                {student.category && <div>Class: {student.category.name}</div>}
                                {student.email && <div>Email: {student.email}</div>}
                                {student.phone && <div>Phone: {student.phone}</div>}
                                {student.address && <div>Address: {student.address}</div>}
                                {student.date_of_birth && <div>DOB: {student.date_of_birth}</div>}
                                {student.gender && <div>Gender: {student.gender}</div>}
                                {student.national_id_no && <div>NID: {student.national_id_no}</div>}
                                {student.religion && <div>Religion: {student.religion}</div>}
                                {student.guardian_name && <div>Guardian: {student.guardian_name}</div>}
                                {student.guardian_phone && <div>Guardian Phone: {student.guardian_phone}</div>}
                                <div>Status: {student.status}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Optional details / extended info */}
                    <div className="flex-1 space-y-4 text-gray-700 dark:text-gray-300">
                        {student.birth_registration_no && (
                            <div className="prose dark:prose-invert rounded-lg bg-gray-50 p-4 shadow-sm dark:bg-gray-800">
                                <strong>Birth Registration No:</strong>
                                <div>{student.birth_registration_no}</div>
                            </div>
                        )}
                        {student.roll_number && (
                            <div className="prose dark:prose-invert rounded-lg bg-gray-50 p-4 shadow-sm dark:bg-gray-800">
                                <strong>Roll Number:</strong>
                                <div>{student.roll_number}</div>
                            </div>
                        )}
                        {student.category && (
                            <div className="prose dark:prose-invert rounded-lg bg-gray-50 p-4 shadow-sm dark:bg-gray-800">
                                <strong>Class:</strong>
                                <div>{student.category.name}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
