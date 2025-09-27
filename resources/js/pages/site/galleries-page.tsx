import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Gallery } from '../../types/gallery';

interface GalleriesPageProps {
    galleries: Gallery[];
}

const GalleriesPage: React.FC<GalleriesPageProps> = ({ galleries }) => {
    console.log('GALLERIES', galleries);
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
                <section id="attribute" className="my-16">
                    <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6`}>
                        <div className="flex flex-wrap justify-evenly gap-6">
                            {galleries.map((gallery, index) => (
                                <div key={index} className="group relative h-80 w-80 rotate-45 transform overflow-hidden transition-all duration-500">
                                    {/* Image */}
                                    <img
                                        src={gallery?.media?.url || 'https://via.placeholder.com/300'}
                                        className="absolute top-0 left-0 h-full w-full -rotate-45 object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-72 rotate-[-45deg] rounded-lg bg-black/50 p-4 text-center transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                                            <h3 className="text-lg font-bold text-white">{gallery.title}</h3>
                                            <p className="text-sm text-gray-200">{gallery.description}</p>
                                        </div>
                                    </div>

                                    {/* Border Frame */}
                                    <div className="pointer-events-none absolute inset-0 -rotate-45 rounded-lg border-2 border-white/30"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default GalleriesPage;
