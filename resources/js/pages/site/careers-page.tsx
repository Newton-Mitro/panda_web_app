import { Head, Link } from '@inertiajs/react';
import { Briefcase, Clock, DollarSign, MapPin } from 'lucide-react';
import PageLayout from '../../layouts/page-layout';
import { JobCircular } from '../../types/job_circular';
import PageBanner from './components/page-banner';

interface CareersPageProps {
    jobCirculars: JobCircular[];
}

const CareersPage: React.FC<CareersPageProps> = ({ jobCirculars }) => {
    return (
        <>
            <Head title="Careers" />
            <PageLayout>
                {/* Hero Section */}
                <PageBanner title="Careers" subtitle="Discover exciting opportunities and build your career with us." />

                {/* Careers List */}
                <section id="careers" className="my-24">
                    <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6`}>
                        {jobCirculars.length > 0 ? (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {jobCirculars.map((career) => (
                                    <div
                                        key={career.id}
                                        className="group flex flex-col justify-between rounded-2xl border bg-card p-6 transition hover:shadow"
                                    >
                                        {/* Job Title */}
                                        <div>
                                            <h3 className="mb-2 text-xl font-semibold text-card-foreground group-hover:text-primary">
                                                {career.title}
                                            </h3>
                                            <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                                                {career.description || 'No description provided.'}
                                            </p>
                                        </div>

                                        {/* Meta Info */}
                                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="h-4 w-4" /> {career.employment_type}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" /> {career.experience_level}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" /> {career.location || 'Remote'}
                                            </span>
                                            {career.salary_range || career.min_salary ? (
                                                <span className="flex items-center gap-1">
                                                    <DollarSign className="h-4 w-4" />{' '}
                                                    {career.salary_range || `${career.min_salary} - ${career.max_salary} ${career.currency}`}
                                                </span>
                                            ) : null}
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-6">
                                            <Link
                                                href={route('site.careers.show', career.id)}
                                                className="inline-block rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white shadow hover:bg-primary/90"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">🚀 No open positions at the moment. Check back soon!</p>
                        )}
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default CareersPage;
