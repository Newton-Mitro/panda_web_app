import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const TeamSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const teamMembers = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        name: `Team Member ${i + 1}`,
        role: 'Position',
    }));

    return (
        <section ref={ref} id="team" className="bg-bulwark-accent py-16 md:py-20">
            <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl md:text-left">Our Team</h2>
                <div className="mx-auto mb-12 h-1 w-16 bg-foreground md:mx-0"></div>

                {/* Team Members */}
                <div className="mb-12">
                    <div className="flex flex-col items-center gap-10 pb-2 md:flex-row">
                        {teamMembers.map((partner, index) => (
                            <div key={partner.id} className={`flex flex-shrink-0 flex-col items-center`}>
                                <div
                                    className={`${index === 0 ? 'size-40 ring-2 ring-foreground md:size-32' : 'size-40 md:size-32'} group relative overflow-hidden rounded-full border border-border/20 transition-all hover:size-32 hover:ring-2 hover:ring-foreground`}
                                >
                                    <img src="/storage/uploads/5.jpg" alt={`${partner.name} logo`} className="h-full w-full object-cover" />
                                </div>
                                <p className="mt-2 text-center text-sm font-bold text-foreground">{partner.name}</p>
                                <div className="mx-auto max-w-3xl text-center md:mx-0 md:hidden md:text-left">
                                    <p className="leading-relaxed text-muted-foreground">
                                        The Bulwark Support Network (BSN) is the key to creating truly effective partnerships with our stakeholders.
                                        It provides the perfect opportunity for parties to contribute to truly impactful development and advancement
                                        in partnership with Foundation. We stand right by our Partners and send few monthly goals and work wise
                                        milestones.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
                    <p className="hidden leading-relaxed text-muted-foreground md:block">
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
