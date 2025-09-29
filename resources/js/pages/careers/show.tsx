import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { JobCircular } from '../../types/job_circular';

interface Props {
    career: JobCircular & {
        benefits?: string[]; // array of benefits
        responsibilities?: string[]; // array of responsibilities
    };
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
            <div className="w-6xl space-y-6 p-6">
                <HeadingSmall title={career.title} description={`Location: ${career.location || '-'} | Salary: ${career.salary_range || '-'}`} />

                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold">Description</h3>
                        <p>{career.description || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Requirements</h3>
                        <p>{career.requirements || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Responsibilities</h3>
                        <ul className="list-disc pl-5">
                            {Array.isArray(career.responsibilities) && career.responsibilities.length > 0 ? (
                                career.responsibilities.map((r, i) => <li key={i}>{r}</li>)
                            ) : (
                                <li>-</li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">Benefits</h3>
                        <ul className="list-disc pl-5">
                            {Array.isArray(career.benefits) && career.benefits.length > 0 ? (
                                career.benefits.map((b, i) => <li key={i}>{b}</li>)
                            ) : (
                                <li>-</li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">Employment Type</h3>
                        <p>{career.employment_type || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Experience Level</h3>
                        <p>{career.experience_level || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Education Level</h3>
                        <p>{career.education_level || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Department</h3>
                        <p>{career.department || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Job Function</h3>
                        <p>{career.job_function || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Remote</h3>
                        <p>{career.is_remote ? 'Yes ✅' : 'No ❌'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Deadline</h3>
                        <p>{career.deadline || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Status</h3>
                        <p>{career.status || '-'}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Positions</h3>
                        <p>{career.positions || 1}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
