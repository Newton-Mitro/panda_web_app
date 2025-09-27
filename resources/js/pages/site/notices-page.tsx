import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Notice } from '../../types/notice';

interface NoticesPageProps {
    notices: Notice[];
}

const NoticesPage: React.FC<NoticesPageProps> = ({ notices }) => {
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
                <section className="my-16">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-6">
                        <div className="relative">
                            {/* Center line */}
                            <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-gray-300 dark:bg-gray-600"></div>

                            {notices.map((notice, idx) => {
                                const isLeft = idx % 2 === 0;
                                return (
                                    <div key={notice.id} className="relative mb-12 flex w-full">
                                        {/* Timeline dot */}
                                        <div className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 bg-accent"></div>

                                        {/* Notice Card */}
                                        <div
                                            className={`w-full max-w-md rounded-3xl border bg-card p-6 shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02] ${isLeft ? 'pr-10 text-right md:mr-auto' : 'pl-10 text-left md:ml-auto'}`}
                                        >
                                            <h3 className="mb-2 text-xl font-bold text-card-foreground">{notice.title}</h3>
                                            <p className="mb-3 line-clamp-4 text-muted-foreground">{notice.content}</p>
                                            <div className="flex items-center justify-between text-xs text-gray-400">
                                                <span>{new Date(notice.created_at).toLocaleDateString()}</span>
                                                {notice.category && (
                                                    <span className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground">
                                                        {notice.category.name}
                                                    </span>
                                                )}
                                            </div>
                                            {/* {notice.link && (
                                                <a
                                                    href={notice.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-3 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
                                                >
                                                    Read More
                                                </a>
                                            )} */}
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
