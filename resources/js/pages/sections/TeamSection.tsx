import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const TeamSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const teamMembers = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Team Member ${i + 1}`,
        role: 'Position',
    }));

    return (
        <section ref={ref} id="team" className="bg-bulwark-accent py-20">
            <div className={`mx-auto max-w-6xl px-6 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h2 className="mb-4 text-4xl font-bold text-foreground">Our Team</h2>
                <div className="mb-12 h-1 w-16 bg-foreground"></div>

                <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="text-center">
                            <div className="border-bulwark-green-light mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2">
                                <img src="/storage/uploads/6.jpg" alt={member.name} className="h-full w-full object-cover" />
                            </div>
                            <h3 className="text-sm font-medium text-foreground">{member.name}</h3>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl">
                    <p className="leading-relaxed text-muted-foreground">
                        The Bulwark Support Network (BSN) is the key to creating truly effective partnerships with our stakeholders. It provides the
                        perfect opportunity for parties to contribute to truly impactful development and advancement in partnership with Foundation.
                        We stand right by our Partners and send few monthly goals and work wise milestones.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
