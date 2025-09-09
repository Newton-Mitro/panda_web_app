import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const WorkWithUsSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} className="bg-bulwark-accent py-16 md:py-20">
            <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl md:text-left">Work with us</h2>
                <div className="mx-auto mb-8 h-1 w-16 bg-foreground md:mx-0"></div>

                <div className="flex flex-col gap-8 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-12">
                    {/* Left Content */}
                    <div className="text-center md:text-left">
                        <p className="mb-4 leading-relaxed text-muted-foreground sm:mb-6">
                            Bulwark Foundation is now open to collaborations in any statutory divisions.
                        </p>
                        <p className="mb-4 leading-relaxed text-muted-foreground sm:mb-6">
                            We look for life-blood writers, skilled developers, and professionals for partnership with the Foundation.
                        </p>
                        <p className="mb-6 leading-relaxed text-muted-foreground sm:mb-8">Join us now and let's together bring the change.</p>

                        <div className="flex justify-center space-x-4 md:justify-start">
                            <button className="text-foreground transition-colors hover:text-muted-foreground">Jai Hind</button>
                            <span className="text-muted-foreground">|</span>
                            <button className="text-foreground transition-colors hover:text-muted-foreground">108 SOS</button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mx-auto hidden h-full w-1 bg-border md:block"></div>

                    {/* Right Content */}
                    <div className="mt-8 rounded-lg bg-background p-6 md:mt-0">
                        <div className="pl-0 md:pl-4">
                            <h3 className="mb-2 text-xl font-bold text-foreground">Join Bulwark's team</h3>
                            <p className="mb-1 text-sm text-muted-foreground">Current Openings</p>
                            <p className="mb-1 text-sm text-muted-foreground">Leadership</p>
                            <p className="mb-1 text-sm text-muted-foreground">New Delhi's Jobs</p>
                            <p className="mb-1 text-sm text-muted-foreground">Position</p>
                            <p className="text-sm font-medium text-foreground">New Delhi's Jobs</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkWithUsSection;
