import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const WorkWithUsSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const jobOpenings = [
        {
            title: "Join Bulwark's team",
            category: 'Current Openings',
            location: 'Leadership',
            status: "New Delhi's Jobs",
            description: 'Position',
            link: "New Delhi's Jobs",
        },
    ];

    return (
        <section ref={ref} className="bg-bulwark-accent py-20">
            <div className={`mx-auto max-w-6xl px-6 transition-all duration-700 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
                <h2 className="mb-4 text-4xl font-bold text-foreground underline">Work with us</h2>

                <div className="mt-12 grid gap-12 md:grid-cols-2">
                    <div className="flex justify-center">
                        <div className="h-64 w-full overflow-hidden rounded-lg">
                            <img src="/storage/uploads/7.jpg" alt="Team collaboration at Bulwark Foundation" className="h-full w-full object-cover" />
                        </div>
                    </div>

                    <div>
                        <p className="mb-6 leading-relaxed text-muted-foreground">
                            Bulwark Foundation is now open to collaborations in any statutory divisions.
                        </p>
                        <p className="mb-6 leading-relaxed text-muted-foreground">
                            We look for life-blood writers I skilled I development and advancement in partnership with Foundation.
                        </p>
                        <p className="mb-8 leading-relaxed text-muted-foreground">Join us now and Let's together bring the change.</p>

                        <div className="flex space-x-4">
                            <button className="text-foreground transition-colors hover:text-muted-foreground">Jai Hind</button>
                            <span className="text-muted-foreground">|</span>
                            <button className="text-foreground transition-colors hover:text-muted-foreground">108 SOS</button>
                        </div>
                    </div>

                    <div className="rounded-lg bg-background p-6">
                        <div className="border-l-4 border-foreground pl-4">
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
