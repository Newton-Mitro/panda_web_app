import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Team } from '../../types/team';
import PageBanner from './components/page-banner';
import TeamCard from './components/team-card-item';

interface OurTeamPageProps {
    teams: Team[];
}

const OurTeamPage: React.FC<OurTeamPageProps> = ({ teams }) => {
    return (
        <>
            <Head title="Our Team" />
            <PageLayout>
                {/* Hero Section */}
                <PageBanner title="Our Team" subtitle="We are a team of dedicated professionals who are passionate about what we do." />

                {/* Services List */}
                <section id="attribute" className="my-44">
                    <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6`}>
                        <div className="mt-12 flex flex-col md:gap-36">
                            {teams.map((team, index) => (
                                <TeamCard key={index} member={team} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default OurTeamPage;
