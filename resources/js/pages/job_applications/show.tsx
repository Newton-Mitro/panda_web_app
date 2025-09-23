import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import HeadingSmall from '../../components/heading-small';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { Textarea } from '../../components/ui/text-area';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { JobApplication } from '../../types/job_application';

interface ShowProps {
    application: JobApplication;
}

const Show: React.FC<ShowProps> = ({ application }) => {
    const [status, setStatus] = useState(application.status);
    const [notes, setNotes] = useState(application.notes || '');
    const [updating, setUpdating] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Job Applications', href: route('job-applications.index') },
        { title: application.full_name, href: '' },
    ];

    const updateApplication = () => {
        setUpdating(true);
        router.put(
            route('job-applications.update_status', application.id),
            { status, notes },
            {
                onSuccess: () => setUpdating(false),
                onError: () => setUpdating(false),
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Application - ${application.full_name}`} />
            <div className="w-full space-y-6 p-6 md:w-4xl">
                <HeadingSmall title={application.full_name} description="Job application details" />

                {/* Applicant Info */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <p>
                            <strong>Email:</strong> {application.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {application.phone || '-'}
                        </p>
                        <p>
                            <strong>LinkedIn:</strong>{' '}
                            {application.linkedin_url ? (
                                <a
                                    href={application.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    View
                                </a>
                            ) : (
                                '-'
                            )}
                        </p>
                        <p>
                            <strong>Portfolio:</strong>{' '}
                            {application.portfolio_url ? (
                                <a
                                    href={application.portfolio_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    View
                                </a>
                            ) : (
                                '-'
                            )}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>Highest Qualification:</strong> {application.highest_qualification || '-'}
                        </p>
                        <p>
                            <strong>Experience Level:</strong> {application.experience_level || '-'}
                        </p>
                        <p>
                            <strong>Expected Salary:</strong> {application.expected_salary ? `$${application.expected_salary}` : '-'}
                        </p>
                        <p>
                            <strong>Available From:</strong> {application.available_from || '-'}
                        </p>
                    </div>
                </div>

                {/* Documents */}
                <div className="grid gap-2">
                    <p>
                        <strong>Resume:</strong>{' '}
                        {application.resume_url ? (
                            <a href={application.resume_url} target="_blank" className="text-blue-600 hover:underline">
                                View
                            </a>
                        ) : (
                            'Not uploaded'
                        )}
                    </p>
                    <p>
                        <strong>Cover Letter:</strong>{' '}
                        {application.cover_letter_url ? (
                            <a href={application.cover_letter_url} target="_blank" className="text-blue-600 hover:underline">
                                View
                            </a>
                        ) : (
                            'Not uploaded'
                        )}
                    </p>
                    <p>
                        <strong>Why Choose:</strong> {application.why_choose || '-'}
                    </p>
                </div>

                {/* Meta */}
                <div>
                    <p>
                        <strong>Applied Via:</strong> {application.applied_via || '-'}
                    </p>
                    <p>
                        <strong>IP Address:</strong> {application.ip_address || '-'}
                    </p>
                </div>

                {/* Application Workflow */}
                <div className="grid gap-2">
                    <div className="md:w-1/3">
                        <label className="font-semibold">Status</label>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            options={[
                                { value: 'pending', label: 'Pending' },
                                { value: 'reviewed', label: 'Reviewed' },
                                { value: 'shortlisted', label: 'Shortlisted' },
                                { value: 'interviewing', label: 'Interviewing' },
                                { value: 'offered', label: 'Offered' },
                                { value: 'hired', label: 'Hired' },
                                { value: 'rejected', label: 'Rejected' },
                            ]}
                        />
                    </div>

                    <label className="mt-4 font-semibold">Internal Notes</label>
                    <Textarea value={notes} rows={4} onChange={(e) => setNotes(e.target.value)} placeholder="Add or edit notes" />

                    <div className="">
                        <Button className="mt-2" disabled={updating} onClick={updateApplication}>
                            {updating ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
