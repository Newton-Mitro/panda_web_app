import { Head } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Leader } from '../../types/leader';

interface ShowProps {
    leader: Leader;
}

export default function Show({ leader }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Leaders', href: route('leaders.index') },
        { title: leader.name, href: '' },
    ];

    const socialLinks = [
        { icon: Facebook, url: leader.facebook_links },
        { icon: Twitter, url: leader.twitter_links },
        { icon: Linkedin, url: leader.linkedin_links },
        { icon: Instagram, url: leader.instagram_links },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={leader.name} />
            <div className="w-full space-y-6 p-6 md:w-6xl">
                <HeadingSmall title={leader.name} description={`Designation: ${leader.designation}`} />

                {/* Main card: left info + right content */}
                <div className="flex flex-col gap-6 rounded-xl md:flex-row">
                    {/* Left: Image + basic info */}
                    <div className="flex flex-shrink-0 flex-col items-center space-y-4 md:w-96 md:items-start">
                        <div className="mx-auto w-full max-w-md space-y-4 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                            {/* Profile Image */}
                            {leader.media && (
                                <img src={leader.media.url} alt={leader.name} className="mx-auto mb-4 h-48 w-48 rounded-full object-cover" />
                            )}

                            {/* Info Fields */}
                            <div className="text-center text-gray-700 dark:text-gray-200">
                                {leader.category && <div>{leader.category.name}</div>}
                                {leader.email && <div>{leader.email}</div>}
                                {leader.phone && <div>{leader.phone}</div>}
                                {leader.address && <div>{leader.address}</div>}
                            </div>

                            {/* Social Links */}
                            <div className="mt-4 flex flex-wrap justify-center gap-3">
                                {socialLinks.map(
                                    (link, idx) =>
                                        link.url && (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center rounded-full border border-gray-300 p-2 text-gray-600 transition duration-300 hover:scale-110 hover:border-blue-500 hover:text-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                                            >
                                                <link.icon className="h-5 w-5" />
                                            </a>
                                        ),
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Bio & Message */}
                    <div className="flex-1 space-y-4 text-gray-700 dark:text-gray-300">
                        {leader.bio && (
                            <div className="prose rounded-lg bg-gray-50 p-4 shadow-sm dark:bg-gray-800 dark:prose-invert">
                                <strong>Bio:</strong>
                                <div dangerouslySetInnerHTML={{ __html: leader.bio }} />
                            </div>
                        )}
                        {leader.message && (
                            <div className="prose rounded-lg bg-gray-50 p-4 shadow-sm dark:bg-gray-800 dark:prose-invert">
                                <strong>Message:</strong>
                                <div dangerouslySetInnerHTML={{ __html: leader.message }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
