import { Head, Link } from '@inertiajs/react';
import { Briefcase, Clock, DollarSign, MapPin } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import PageLayout from '../../layouts/page-layout';
import { JobCircular } from '../../types/job_circular';

interface CareersPageProps {
    jobCirculars: JobCircular[];
}

const CareersPage: React.FC<CareersPageProps> = ({ jobCirculars }) => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <>
            <Head title="Careers" />
            <PageLayout>
                {/* Hero Section */}
                <section className="mt-16 bg-secondary py-20 text-secondary-foreground">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Join Our Team</h1>
                        <p className="text-lg opacity-90 md:text-xl">Discover exciting opportunities and build your career with us.</p>
                    </div>
                </section>

                {/* Careers List */}
                <section ref={ref} id="careers" className="my-24">
                    <div
                        className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${
                            isVisible ? 'animate-fade-in' : 'opacity-0'
                        }`}
                    >
                        {jobCirculars.length > 0 ? (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {jobCirculars.map((career) => (
                                    <div
                                        key={career.id}
                                        className="group flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow"
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
                                                href={route('careers.show', career.slug)}
                                                className="inline-block rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white shadow hover:bg-primary/90"
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
