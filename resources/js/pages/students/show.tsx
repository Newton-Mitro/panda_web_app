import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import { Separator } from '../../components/ui/separator';
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
            <div className="w-full space-y-6 p-6 md:w-6xl">
                <HeadingSmall title={`${student.first_name} ${student.last_name || ''}`} description={`Roll Number: ${student.roll_number}`} />

                <div className="flex flex-col gap-6 rounded-xl md:flex-row">
                    {/* Left: Profile Image + basic info */}
                    <div className="flex flex-shrink-0 flex-col items-center space-y-4 md:w-96 md:items-start">
                        <div className="mx-auto w-full max-w-md space-y-4 rounded-lg bg-card p-6">
                            {/* Profile Image */}
                            {student.media && (
                                <img
                                    src={student.media.url}
                                    alt={`${student.first_name} ${student.last_name || ''}`}
                                    className="mx-auto mb-4 h-48 w-48 rounded-full object-cover"
                                />
                            )}

                            {/* Info Fields */}
                            <div className="space-y-1 text-center text-muted-foreground">
                                {student.email && <div>{student.email}</div>}
                                <div className="uppercase">{`${student.gender} | ${student.religion} | ${student.status}`}</div>
                                {student.phone && <div>{student.phone}</div>}
                                {student.date_of_birth && <div>{student.date_of_birth}</div>}
                                {student.category && <div>{student.category.name}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Right: Optional details / extended info */}
                    <div className="flex-1 space-y-4">
                        {student.birth_registration_no && (
                            <div className="prose rounded-lg bg-card p-5 shadow-sm dark:prose-invert">
                                <strong>Birth Registration No:</strong>
                                <div>{student.birth_registration_no}</div>
                                <Separator className="my-2" />
                                <strong>Gurdian Name:</strong>
                                <div>{student.guardian_name}</div>
                                <Separator className="my-2" />
                                <strong>Gurdian Phone:</strong>
                                <div>{student.guardian_phone}</div>
                                <Separator className="my-2" />
                                <strong>NID:</strong>
                                <div>{student.national_id_no}</div>
                                <Separator className="my-2" />
                                <strong>Address:</strong>
                                <div>{student.address}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
