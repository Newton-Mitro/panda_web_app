import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BecomePartnerSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const teamMembers = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Member ${i + 1}`,
        role: 'Team Member',
    }));

    return (
        <section ref={ref} className="bg-background py-16 md:py-20">
            <div
                className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}
            >
                <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl md:text-left">Become a Partner</h2>
                <div className="mx-auto mb-8 h-1 w-16 bg-foreground md:mx-0"></div>

                <div className="flex flex-col items-start gap-12 md:flex-row md:items-center">
                    {/* Left Content */}
                    <div className="w-full text-center md:w-7/12 md:text-left">
                        <p className="mb-4 leading-relaxed text-muted-foreground sm:mb-6">
                            Are you seeking a world of possibilities to achieve real social impact?
                        </p>
                        <p className="mb-4 leading-relaxed text-muted-foreground sm:mb-6">
                            The Bulwark Support Network (BSN) is a global community of successful innovative leaders fitting together to work with
                            sustainable organisations and society.
                        </p>
                        <p className="mb-6 leading-relaxed text-muted-foreground sm:mb-8">
                            Partner with us at <span className="font-medium">team@bulwarkfoundation.com</span>
                        </p>
                    </div>

                    {/* Right Content: Scrollable avatars */}
                    <div className="w-full space-y-6 md:w-5/12">
                        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
                            {teamMembers.map((member, index) =>
                                index === 0 ? (
                                    <div key={member.id} className="flex size-20 flex-shrink-0 flex-col items-center">
                                        <div className="h-full w-full overflow-hidden rounded-full border border-border/20">
                                            <img src="/storage/uploads/5.jpg" alt={`${member.name} avatar`} className="h-full w-full object-cover" />
                                        </div>
                                    </div>
                                ) : (
                                    <div key={member.id} className="flex size-12 flex-shrink-0 flex-col items-center opacity-60">
                                        <div className="h-full w-full overflow-hidden rounded-full border border-border/20">
                                            <img src="/storage/uploads/5.jpg" alt={`${member.name} avatar`} className="h-full w-full object-cover" />
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>

                        {/* Member Info */}
                        <div>
                            <h3 className="mb-2 text-xl font-semibold text-foreground">{teamMembers[0].name}</h3>
                            <p className="mb-4 text-sm text-muted-foreground">Founder and Lead Developer, Pokémon social</p>

                            <blockquote className="leading-relaxed text-muted-foreground italic">
                                "Bulwark is the name, so I have learned that extraordinary contributions often come from ordinary people, and that's
                                why the Pokémon partnerships through virtual development platform."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BecomePartnerSection;
