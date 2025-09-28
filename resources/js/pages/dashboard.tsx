import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

// Charts
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import MediaPreview from '../components/media-preview';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard() {
    const { stats, monthlyVisitors, routeVisits, latestNotices, jobApplications, visitors, articles, media, contactMessages }: any = usePage().props;

    // Prepare chart data
    const monthlyVisitorsData = {
        labels: Object.keys(monthlyVisitors),
        datasets: [
            {
                label: 'Visitors',
                data: Object.values(monthlyVisitors),
                fill: true,
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(37, 99, 235, 1)',
                tension: 0.3,
            },
        ],
    };

    const routeVisitedData = {
        labels: Object.keys(routeVisits),
        datasets: [
            {
                label: 'Visits',
                data: Object.values(routeVisits),
                backgroundColor: [
                    'rgba(37, 99, 235, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(168, 85, 247, 0.7)',
                    'rgba(234, 179, 8, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(99, 102, 241, 0.7)',
                ],
            },
        ],
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                {/* 🔹 Top KPI Cards */}
                <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
                    {[
                        { label: 'Users', value: stats.users, icon: 'fa-users', color: 'text-emerald-500', route: '' },
                        { label: 'Pages', value: stats.pages, icon: 'fa-solid fa-newspaper', color: 'text-blue-600', route: route('pages.index') },
                        {
                            label: 'Services',
                            value: stats.services,
                            icon: 'fa-solid fa-truck-fast',
                            color: 'text-amber-500',
                            route: route('services.index'),
                        },
                        {
                            label: 'Contact Messages',
                            value: stats.contactMessages,
                            icon: 'fa-solid fa-envelope-open-text',
                            color: 'text-indigo-500',
                            route: route('contact-messages.index'),
                        },
                        {
                            label: 'Projects',
                            value: stats.projects,
                            icon: 'fa-solid fa-medal',
                            color: 'text-cyan-500',
                            route: route('projects.index'),
                        },
                        { label: 'Notices', value: stats.notices, icon: 'fa-solid fa-bell', color: 'text-lime-500', route: route('notices.index') },
                        {
                            label: 'Events',
                            value: stats.events,
                            icon: 'fa-solid fa-calendar-day',
                            color: 'text-sky-500',
                            route: route('events.index'),
                        },
                        { label: 'Awards', value: stats.awards, icon: 'fa-solid fa-trophy', color: 'text-yellow-500', route: route('awards.index') },
                        {
                            label: 'Medias',
                            value: stats.media,
                            icon: 'fa-solid fa-cloud-arrow-up',
                            color: 'text-rose-500',
                            route: route('media.index'),
                        },
                        {
                            label: 'Testimonials',
                            value: stats.testimonials,
                            icon: 'fa-solid fa-circle-check',
                            color: 'text-teal-500',
                            route: route('testimonials.index'),
                        },
                        {
                            label: 'Partners',
                            value: stats.partners,
                            icon: 'fa-solid fa-handshake',
                            color: 'text-green-600',
                            route: route('partners.index'),
                        },
                        {
                            label: 'Teams',
                            value: stats.teams,
                            icon: 'fa-solid fa-users-viewfinder',
                            color: 'text-pink-500',
                            route: route('teams.index'),
                        },
                        {
                            label: 'Leaders',
                            value: stats.leaders,
                            icon: 'fa-solid fa-dharmachakra',
                            color: 'text-pink-500',
                            route: route('leaders.index'),
                        },
                        {
                            label: 'Instructors',
                            value: stats.instructors,
                            icon: 'fa-solid fa-chalkboard-user',
                            color: 'text-purple-600',
                            route: route('instructors.index'),
                        },
                        {
                            label: 'Students',
                            value: stats.students,
                            icon: 'fa-user-graduate',
                            color: 'text-emerald-600',
                            route: route('students.index'),
                        },
                        {
                            label: 'Articles',
                            value: stats.articles,
                            icon: 'fa-solid fa-square-rss',
                            color: 'text-blue-500',
                            route: route('articles.index'),
                        },
                        {
                            label: 'Office Locations',
                            value: stats.officeLocations,
                            icon: 'fa-solid fa-map-location-dot',
                            color: 'text-orange-600',
                            route: route('contacts.index'),
                        },
                        {
                            label: 'Job Applications',
                            value: stats.jobApplications,
                            icon: 'fa-solid fa-toolbox',
                            color: 'text-yellow-600',
                            route: route('job-applications.index'),
                        },
                        {
                            label: 'Job Circulars',
                            value: stats.jobCirculars,
                            icon: 'fa-solid fa-person-digging',
                            color: 'text-red-600',
                            route: route('careers.index'),
                        },
                        {
                            label: 'Total Visitors',
                            value: stats.totalVisitors,
                            icon: 'fa-solid fa-traffic-light',
                            color: 'text-slate-600',
                            route: route('visitors.index'),
                        },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            onClick={() => router.visit(stat.route)}
                            className="flex cursor-pointer items-center rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md dark:border-sidebar-border dark:bg-neutral-900"
                        >
                            <i className={`fa-solid ${stat.icon} ${stat.color} mr-6 text-3xl`} />
                            <div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🔹 Graphs */}
                <div className="">
                    {/* Right chart: 60% → span 6 of 10 */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-neutral-900">
                        <h2 className="mb-3 text-lg font-semibold">Top Visited Pages</h2>
                        <Bar data={routeVisitedData} />
                    </div>
                </div>

                {/* 🔹 Recent Content */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {/* Left chart: 40% → span 4 of 10 */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-neutral-900">
                        <h2 className="mb-3 text-lg font-semibold">Monthly Visitors</h2>
                        <Line data={monthlyVisitorsData} />
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-neutral-900">
                        <h2 className="mb-3 text-lg font-semibold">Recent Visitors</h2>
                        <ul className="space-y-2 text-sm">
                            {visitors.map((visitor: any) => (
                                <li key={visitor.id} className="flex justify-between">
                                    <span>{`${visitor.ip_address} | ${visitor.device} | ${visitor.os} | ${visitor.browser}`}</span>
                                    <span className="text-gray-500">{new Date(visitor.created_at).toLocaleDateString()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-neutral-900">
                        <h2 className="mb-3 text-lg font-semibold">Recent Contact Messages</h2>
                        <ul className="space-y-2 text-sm">
                            {contactMessages.map((message: any) => (
                                <li key={message.id} className="flex justify-between">
                                    <span>{message.subject || message.email}</span>
                                    <span className="text-gray-500">{new Date(message.created_at).toLocaleDateString()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-neutral-900">
                        <h2 className="mb-3 text-lg font-semibold">Recent Notices</h2>
                        <ul className="space-y-2 text-sm">
                            {latestNotices.map((notice: any) => (
                                <li key={notice.id} className="flex justify-between">
                                    <span>{notice.title}</span>
                                    <span className="text-gray-500">{new Date(notice.created_at).toLocaleDateString()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-neutral-900">
                        <h2 className="mb-3 text-lg font-semibold">Recent Media Uploads</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {media.map((m: any) => (
                                <MediaPreview key={m.id} media={m} imgHeight="h-20" videoHeight="h-20" embedHeight="h-20" />
                                // <img key={m.id} src={m.url} alt="" className="h-20 w-full rounded object-cover" />
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-neutral-900">
                        <h2 className="mb-3 text-lg font-semibold">Recent Job Applications</h2>
                        <ul className="space-y-2 text-sm">
                            {jobApplications.map((a: any) => (
                                <li key={a.id} className="flex justify-between">
                                    <span>{a.full_name}</span>
                                    <span className="text-gray-500">{new Date(a.created_at).toLocaleDateString()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
