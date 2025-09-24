import { Head } from '@inertiajs/react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import PageLayout from '../../layouts/page-layout';
import { Service } from '../../types/service';

interface ServicePageProps {
    services: Service[];
}

const ServicePage: React.FC<ServicePageProps> = ({ services }) => {
    console.log(services);
    const { ref, isVisible } = useScrollAnimation();

    return (
        <>
            <Head title="Services" />
            <PageLayout>
                {/* Hero Section */}
                <section className="mt-16 bg-secondary py-20 text-secondary-foreground">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Services</h1>
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
                            {services.map((service, index) => (
                                <div key={service.id ?? index} className="group flex cursor-pointer flex-col items-center md:relative md:flex-row">
                                    {index % 2 === 0 ? (
                                        <div
                                            className={`group clear-both flex w-full ${index % 2 !== 0 ? 'flex-col-reverse' : 'flex-col'} items-center group-hover:cursor-pointer md:relative md:flex-row`}
                                        >
                                            <img
                                                src={
                                                    service.media.url ??
                                                    'https://t3.ftcdn.net/jpg/01/06/12/68/360_F_106126874_6Yl8PyFmYgoOAx7DYoH6zs5a3MoFvQHr.jpg'
                                                }
                                                alt="Custom Shape"
                                                style={{
                                                    clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                                                }}
                                                className={`borderobject-cover z-10 mt-6 mb-6 h-72 w-72 border-6 bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96`}
                                                // border-4 for thickness, border-blue-500 for color, adjust as needed
                                            />
                                            <div className="flex min-h-62 w-full flex-col justify-center rounded-2xl border-1 border-border bg-card p-6 md:ml-80 md:pl-20">
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: service.description ?? '' }}
                                                    className="prose prose-sm text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className={`group clear-both flex w-full ${index % 2 !== 0 ? 'flex-col-reverse' : 'flex-col'} items-center group-hover:cursor-pointer md:relative md:flex-row`}
                                        >
                                            <div className="flex min-h-62 w-full flex-col justify-center rounded-2xl border-1 border-border bg-card p-6 md:mr-80 md:pr-20">
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: service.description ?? '' }}
                                                    className="prose prose-sm text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                                                />
                                            </div>
                                            <img
                                                src={service.media.url}
                                                alt="Custom Shape"
                                                style={{
                                                    clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                                                }}
                                                className={`borderobject-cover right-0 z-10 mt-6 mb-6 h-72 w-72 border-6 bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96`}
                                                // border-4 for thickness, border-blue-500 for color, adjust as needed
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default ServicePage;
