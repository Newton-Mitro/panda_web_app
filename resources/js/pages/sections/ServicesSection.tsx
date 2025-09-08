import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ServiceCardBorderIcon from '../../components/service-card-border-icon';

const ServicesSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    const services = [
        { icon: 'fa-solid fa-cog', title: 'Service One', subtitle: 'This is the first service we offer to our clients.' },
        { icon: 'fa-solid fa-bolt', title: 'Service Two', subtitle: 'Second service description goes here, highlighting features.' },
        { icon: 'fa-solid fa-heart', title: 'Service Three', subtitle: 'Third service with a short description for clarity.' },
    ];

    return (
        <section ref={ref} id="partners" className="bg-bulwark-accent py-16 md:py-20">
            <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl md:text-left">Our Services</h2>
                <div className="mx-auto mb-12 h-1 w-16 bg-foreground md:mx-0"></div>

                {/* Partners Grid / Scrollable on mobile */}
                {/* Render service cards dynamically */}
                <div className="my-12 grid grid-cols-1 gap-6 px-6 md:grid-cols-3">
                    {services.map((item, idx) => (
                        <ServiceCardBorderIcon key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 80)} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
