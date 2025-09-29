import { Head } from '@inertiajs/react';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import PageLayout from '../../layouts/page-layout';
import { Team } from '../../types/team';
import PageBanner from './components/page-banner';

interface ViewTeamPageProps {
    team: Team;
}

const ViewTeamPage: React.FC<ViewTeamPageProps> = ({ team }) => {
    console.log('TEAM', team);
    const socials = [
        { icon: <FaFacebookF />, link: team.facebook_links },
        { icon: <FaTwitter />, link: team.twitter_links },
        { icon: <FaLinkedinIn />, link: team.linkedin_links },
        { icon: <FaInstagram />, link: team.instagram_links },
        { icon: <FaYoutube />, link: team.youtube_links },
        { icon: <FaWhatsapp />, link: team.whatsapp_links },
        { icon: <FaGithub />, link: team.github_links },
    ].filter((s) => s.link);

    return (
        <>
            <Head title="Team Member" />
            <PageLayout>
                {/* Hero Section */}
                <PageBanner
                    title="Team Member"
                    subtitle="We are a team of dedicated professionals who are passionate about what we do."
                    breadcrumbs={[
                        { label: 'Our Team', href: route('site.teams') },
                        { label: team.name, href: '' },
                    ]}
                />

                {/* Services List */}
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <div className="flex flex-col items-center gap-16 md:flex-row">
                        {/* Media */}
                        <div className="flex flex-col items-center">
                            <img
                                src={team?.media?.url}
                                style={{
                                    clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                                }}
                                className={`mt-6 mb-6 h-72 w-72 border-6 bg-card object-cover transition-transform duration-300 hover:scale-105 md:h-96 md:w-96`}
                            />
                            <h1 className="text-3xl font-bold">{team.name}</h1>
                            <h2 className="text-xl text-indigo-600">{team.designation}</h2>
                            {team.department && <p className="text-sm font-medium text-muted-foreground">{team.department}</p>}
                            {/* Social Links */}
                            {/* Socials */}
                            {socials.length > 0 && (
                                <div className="mt-4 flex space-x-2">
                                    {socials.map((s, idx) => (
                                        <a
                                            key={idx}
                                            href={s.link as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full bg-muted/50 p-2 text-muted-foreground transition-colors hover:bg-accent"
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            {/* Contact */}
                            <div className="mt-4 space-y-1">
                                {team.email && (
                                    <p>
                                        <strong>Email:</strong> {team.email}
                                    </p>
                                )}
                                {team.phone && (
                                    <p>
                                        <strong>Phone:</strong> {team.phone}
                                    </p>
                                )}
                                {team.address && (
                                    <p>
                                        <strong>Address:</strong> {team.address}
                                    </p>
                                )}
                            </div>

                            {team.bio && <p className="text-muted-foreground">{team.bio}</p>}
                            {team.message && <div className="mt-2 rounded-lg text-muted-foreground italic">{team.message}</div>}
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    );
};

export default ViewTeamPage;
