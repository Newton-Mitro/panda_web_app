import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ServiceCardBorderIcon from '../../../components/service-card-border-icon';
import ServiceCardLeftIcon from '../../../components/service-card-left-icon';

const ServicesSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    const services = [
        {
            icon: 'fa-solid fa-cog',
            title: 'Renewable Energy Solutions',
            subtitle:
                'This is the first service we offer to our clients. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            icon: 'fa-solid fa-bolt',
            title: 'Industrial Solutions & Services',
            subtitle:
                'Second service description goes here, highlighting features. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut',
        },
        {
            icon: 'fa-solid fa-heart',
            title: 'Consulting Services',
            subtitle: 'Third service with a short description for clarity. lorem ipsum adipiscing elit sed do eiusmod tempor incididunt ut',
        },
        {
            icon: 'fa-solid fa-heart',
            title: 'Operation & Maintenance',
            subtitle: 'Third service with a short description for clarity. lorem ipsum adipiscing elit sed do eiusmod tempor incididunt ut',
        },
    ];

    return (
        <section ref={ref} id="partners" className="bg-bulwark-accent py-16 md:py-20">
            <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl md:text-left">Our Services</h2>
                <div className="mx-auto mb-12 h-1 w-16 bg-foreground md:mx-0"></div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2">
                    {services.map((item, idx) => (
                        <ServiceCardBorderIcon key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 250)} />
                    ))}

                    {services.map((item, idx) => (
                        <ServiceCardLeftIcon key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 250)} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
