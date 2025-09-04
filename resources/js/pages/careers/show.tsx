import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { JobCircular } from '../../types/job_circular';

interface Props {
    career: JobCircular;
}

export default function Show({ career }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Careers', href: route('careers.index') },
        { title: career.title, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={career.title} />
            <div className="p-6">
                <HeadingSmall title={career.title} description={`Location: ${career.location || '-'}`} />

                <div className="mt-4 space-y-4">
                    <div>
                        <h3 className="font-semibold">Description</h3>
                        <p>{career.description || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Requirements</h3>
                        <p>{career.requirements || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Salary Range</h3>
                        <p>{career.salary_range || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Deadline</h3>
                        <p>{career.deadline || '-'}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
