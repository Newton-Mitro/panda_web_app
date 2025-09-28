import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { JobCircular } from '../../types/job_circular';
import PageBanner from './components/page-banner';

interface ViewJobCircularPageProps {
    job: JobCircular;
}

const ViewJobCircularPage: React.FC<ViewJobCircularPageProps> = ({ job }) => {
    console.log('JOB', job);
    return (
        <>
            <Head title="Careers" />
            <PageLayout>
                {/* Hero Section */}
                <PageBanner
                    title="Careers"
                    subtitle="Discover exciting opportunities and build your career with us."
                    breadcrumbs={[
                        { label: 'Careers', href: route('site.careers') },
                        { label: job.title, href: '' },
                    ]}
                />

                {/* Careers List */}
                <div className="mx-auto max-w-6xl px-6 py-12">
                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">{job.title}</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Posted on {new Date(job.created_at).toLocaleDateString()} ·{' '}
                            <span
                                className={`${
                                    job.status === 'open' ? 'text-green-600' : job.status === 'closed' ? 'text-red-600' : 'text-gray-400'
                                } font-medium`}
                            >
                                {job.status.toUpperCase()}
                            </span>
                        </p>
                    </header>

                    {/* Job Meta */}
                    <div className="mb-10 grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <p>
                                <strong>Location:</strong> {job.is_remote ? 'Remote' : job.location || 'Not specified'}
                            </p>
                            <p>
                                <strong>Employment Type:</strong> {job.employment_type.replace('-', ' ')}
                            </p>
                            <p>
                                <strong>Experience Level:</strong> {job.experience_level.charAt(0).toUpperCase() + job.experience_level.slice(1)}
                            </p>
                            {job.department && (
                                <p>
                                    <strong>Department:</strong> {job.department}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            {job.salary_range && (
                                <p>
                                    <strong>Salary Range:</strong> {job.salary_range}
                                </p>
                            )}
                            {!job.salary_range && (job.min_salary || job.max_salary) && (
                                <p>
                                    <strong>Salary:</strong> {job.min_salary ? `${job.currency} ${job.min_salary}` : ''} –{' '}
                                    {job.max_salary ? `${job.currency} ${job.max_salary}` : ''}
                                </p>
                            )}
                            <p>
                                <strong>Positions:</strong> {job.positions}
                            </p>
                            {job.deadline && (
                                <p>
                                    <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    {job.description && (
                        <section className="mb-8">
                            <h2 className="mb-2 text-xl font-semibold">Job Description</h2>
                            <p className="whitespace-pre-line text-muted-foreground">{job.description}</p>
                        </section>
                    )}

                    {/* Responsibilities */}
                    {job.responsibilities && (
                        <section className="mb-8">
                            <h2 className="mb-2 text-xl font-semibold">Responsibilities</h2>
                            <p className="whitespace-pre-line text-muted-foreground">{job.responsibilities}</p>
                        </section>
                    )}

                    {/* Requirements */}
                    {job.requirements && (
                        <section className="mb-8">
                            <h2 className="mb-2 text-xl font-semibold">Requirements</h2>
                            <p className="whitespace-pre-line text-muted-foreground">{job.requirements}</p>
                        </section>
                    )}

                    {/* Benefits */}
                    {/* {job.benefits && job.benefits.length > 0 && (
                        <section className="mb-8">
                            <h2 className="mb-2 text-xl font-semibold">Benefits</h2>
                            <ul className="list-inside list-disc text-gray-700">
                                {job.benefits.map((benefit, idx) => (
                                    <li key={idx}>{benefit}</li>
                                ))}
                            </ul>
                        </section>
                    )} */}

                    {/* Apply Button */}
                    {/* {job.status === 'open' && (
                        <div className="mt-10">
                            <button className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow transition hover:bg-indigo-700">
                                Apply Now
                            </button>
                        </div>
                    )} */}
                </div>
            </PageLayout>
        </>
    );
};

export default ViewJobCircularPage;
