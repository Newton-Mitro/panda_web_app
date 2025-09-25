import { Head } from '@inertiajs/react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import PageLayout from '../../layouts/page-layout';
import { Team } from '../../types/team';
import TeamCard from './sections/team-card';

interface OurTeamPageProps {
    teams: Team[];
}

const OurTeamPage: React.FC<OurTeamPageProps> = ({ teams }) => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <>
            <Head title="Our Team" />
            <PageLayout>
                {/* Hero Section */}
                <section className="mt-16 bg-secondary py-20 text-secondary-foreground">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Team</h1>
                        <p className="text-lg opacity-90 md:text-xl">
                            We’d love to hear from you—reach out for support, partnerships, or just to say hi!
                        </p>
                    </div>
                </section>

                {/* Services List */}
                <section ref={ref} id="attribute" className="my-44">
                    <div
                        className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                    >
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
