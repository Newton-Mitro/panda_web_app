import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ServiceCardBorderIcon from '../../components/service-card-border-icon';

const ServicesSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    const services = [
        {
            icon: 'fa-solid fa-cog',
            title: 'Service One',
            subtitle:
                'This is the first service we offer to our clients. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            icon: 'fa-solid fa-bolt',
            title: 'Service Two',
            subtitle:
                'Second service description goes here, highlighting features. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut',
        },
        {
            icon: 'fa-solid fa-heart',
            title: 'Service Three',
            subtitle: 'Third service with a short description for clarity. lorem ipsum adipiscing elit sed do eiusmod tempor incididunt ut',
        },
    ];

    return (
        <section ref={ref} id="partners" className="bg-bulwark-accent py-16 md:py-20">
            <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl md:text-left">Our Services</h2>
                <div className="mx-auto mb-12 h-1 w-16 bg-foreground md:mx-0"></div>

                <div className="grid grid-cols-1 space-y-6 gap-x-6 gap-y-6 md:grid-cols-3">
                    {services.map((item, idx) => (
                        <ServiceCardBorderIcon key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 250)} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
