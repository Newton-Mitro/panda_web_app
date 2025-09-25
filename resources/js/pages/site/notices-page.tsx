import { Head } from '@inertiajs/react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import PageLayout from '../../layouts/page-layout';
import { Notice } from '../../types/notice';

interface NoticesPageProps {
    notices: Notice[];
}

const NoticesPage: React.FC<NoticesPageProps> = ({ notices }) => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <>
            <Head title="Notices" />
            <PageLayout>
                {/* Hero Section */}
                <section className="mt-16 bg-secondary py-20 text-secondary-foreground">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Notices</h1>
                        <p className="text-lg opacity-90 md:text-xl">
                            We’d love to hear from you—reach out for support, partnerships, or just to say hi!
                        </p>
                    </div>
                </section>

                {/* Notices List */}
                <section ref={ref} className="my-16">
                    <div
                        className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${
                            isVisible ? 'animate-fade-in' : 'opacity-0'
                        }`}
                    >
                        <div className="relative border-l-2 border-gray-300 dark:border-gray-600">
                            {notices.map((notice, idx) => {
                                const isLeft = idx % 2 === 0;
                                return (
                                    <div key={notice.id} className="mb-12 flex w-full items-center justify-between">
                                        {/* Timeline dot */}
                                        <div className="absolute left-[-6px] h-4 w-4 rounded-full border-2 bg-purple-600 dark:border-gray-900"></div>

                                        {/* Notice Card */}
                                        <div
                                            className={`w-full max-w-md rounded-3xl border bg-card p-6 shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02] ${
                                                isLeft
                                                    ? 'ml-8 text-right md:ml-0 md:translate-x-[-100%]'
                                                    : 'ml-8 text-left md:ml-0 md:translate-x-[0]'
                                            }`}
                                        >
                                            <h3 className="mb-2 text-xl font-bold text-gray-900">{notice.title}</h3>
                                            <p className="mb-3 line-clamp-4 text-gray-600">{notice.content}</p>
                                            <div className="flex items-center justify-between text-xs text-gray-400">
                                                <span>{new Date(notice.created_at).toLocaleDateString()}</span>
                                                {notice.category && (
                                                    <span className="rounded-full bg-purple-100 px-3 py-1 font-semibold text-purple-700">
                                                        {notice.category.name}
                                                    </span>
                                                )}
                                            </div>
                                            {notice.link && (
                                                <a
                                                    href={notice.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-3 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
                                                >
                                                    Read More
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default NoticesPage;
