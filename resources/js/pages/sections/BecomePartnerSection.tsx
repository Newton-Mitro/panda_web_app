import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BecomePartnerSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const teamMembers = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Member ${i + 1}`,
        role: 'Team Member',
    }));

    return (
        <section ref={ref} className="bg-background py-20">
            <div className={`mx-auto max-w-6xl px-6 transition-all duration-700 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
                <div className="grid items-start gap-12 md:grid-cols-2">
                    <div>
                        <h2 className="mb-4 text-4xl font-bold text-foreground">Become a Partner</h2>
                        <div className="mb-8 h-1 w-16 bg-foreground"></div>

                        <p className="mb-6 leading-relaxed text-muted-foreground">
                            Are you seeking a world of possibilities to achieve real social impact?
                        </p>
                        <p className="mb-6 leading-relaxed text-muted-foreground">
                            The Bulwark Support Network (BSN) is a global community of successful innovative leaders fitting together together to work
                            with sustainable organisations and society.
                        </p>
                        <p className="mb-8 leading-relaxed text-muted-foreground">Partner with us at team@bulwarkfoundation.com</p>
                    </div>

                    <div className="space-y-8">
                        <div className="mb-6 h-48 w-full overflow-hidden rounded-lg">
                            <img src="/storage/uploads/2.jpg" alt="Innovation and partnership opportunities" className="h-full w-full object-cover" />
                        </div>

                        <div className="flex items-center space-x-4">
                            {teamMembers.map((member) => (
                                <div key={member.id} className="border-bulwark-green-light h-16 w-16 overflow-hidden rounded-full border-2">
                                    <img src="/storage/uploads/3.jpg" alt={member.name} className="h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="mb-2 text-xl font-semibold text-foreground">Samarath Singh</h3>
                            <p className="mb-4 text-sm text-muted-foreground">Founder and Lead Developer, Pokémon social</p>

                            <blockquote className="leading-relaxed text-muted-foreground italic">
                                "Bulwark is the name, so call I have learned that executive extraordinary contributions often come from ordinary
                                people, and that's why the Pokémon partnerships through virtual development platform."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BecomePartnerSection;
