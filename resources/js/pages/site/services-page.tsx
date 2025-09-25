import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import PageLayout from '../../layouts/page-layout';
import { Service } from '../../types/service';
import ServiceCard from './sections/service-card';

interface ServicePageProps {
    services: Service[];
}

const ServicePage: React.FC<ServicePageProps> = ({ services }) => {
    const { ref, isVisible } = useScrollAnimation();

    // Extract unique categories from services
    const categories = Array.from(new Set(services.map((s) => s.category?.name))).filter(Boolean) as string[];

    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Filter services based on selected category
    const filteredServices = selectedCategory === 'All' ? services : services.filter((s) => s.category?.name === selectedCategory);

    return (
        <>
            <Head title="Services" />
            <PageLayout>
                {/* Hero Section */}
                <section className="mt-16 bg-secondary py-20 text-secondary-foreground">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Services</h1>
                        <p className="text-lg opacity-90 md:text-xl">Explore our services and choose a category to filter them.</p>
                    </div>
                </section>

                {/* Category Filter */}
                <section className="mx-auto my-12 max-w-6xl px-4 text-center">
                    <div className="inline-flex border-b">
                        {/* All Tab */}
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`relative px-3 py-3 font-semibold transition-all duration-300 ${
                                selectedCategory === 'All'
                                    ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-blue-600'
                                    : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            All
                        </button>

                        {/* Category Tabs */}
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`relative px-3 py-3 font-semibold transition-all duration-300 ${
                                    selectedCategory === cat
                                        ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Services List */}
                <section ref={ref} className="my-44">
                    <div
                        className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${
                            isVisible ? 'animate-fade-in' : 'opacity-0'
                        }`}
                    >
                        <div className="mt-12 flex flex-col md:gap-36">
                            {filteredServices.map((service, index) => (
                                <ServiceCard key={service.id} service={service} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default ServicePage;
