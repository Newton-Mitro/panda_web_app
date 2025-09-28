import { Head } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import PageLayout from '../../layouts/page-layout';
import { Gallery, GalleryMediaItem } from '../../types/gallery';
import PageBanner from './components/page-banner';

interface GalleriesPageProps {
    galleries: Gallery[];
}

const GalleriesPage: React.FC<GalleriesPageProps> = ({ galleries }) => {
    console.log('GALLERIES', galleries);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [currentGallery, setCurrentGallery] = useState<GalleryMediaItem[]>([]);

    const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
    const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

    const prev = () => {
        if (currentIndex !== null) {
            setCurrentIndex((currentIndex - 1 + currentGallery.length) % currentGallery.length);
        }
    };

    const next = () => {
        if (currentIndex !== null) {
            setCurrentIndex((currentIndex + 1) % currentGallery.length);
        }
    };

    return (
        <>
            <Head title="Galleries" />
            <PageLayout>
                {/* Hero Section */}
                <PageBanner title="Galleries" subtitle="Discover our captivating galleries" />

                {/* Services List */}
                <section id="attribute" className="my-16">
                    <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6`}>
                        <div className="flex flex-wrap justify-evenly gap-6">
                            {galleries.map((gallery, index) => (
                                <div
                                    key={index}
                                    className="group relative h-80 w-80 rotate-45 transform overflow-hidden transition-all duration-500"
                                    onClick={() => {
                                        setCurrentIndex(0);
                                        setCurrentGallery(gallery.media_items!);
                                    }}
                                >
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

                {/* Modal */}
                {currentIndex !== null && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                        onClick={() => setCurrentIndex(null)} // Close on outside click
                    >
                        <div
                            className="relative max-h-full w-full max-w-3xl overflow-auto rounded bg-white p-4 dark:bg-gray-800"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        >
                            {/* Close button */}
                            <button
                                className="absolute top-2 right-2 text-lg font-bold text-gray-700 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
                                onClick={() => setCurrentIndex(null)}
                            >
                                <X />
                            </button>

                            {/* Prev/Next buttons */}
                            <button
                                className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-gray-200 p-2 text-lg font-bold dark:bg-gray-700"
                                onClick={prev}
                            >
                                ‹
                            </button>
                            <button
                                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-gray-200 p-2 text-lg font-bold dark:bg-gray-700"
                                onClick={next}
                            >
                                ›
                            </button>

                            {/* Media Preview */}
                            {isImage(currentGallery[currentIndex].media!.url) ? (
                                <img
                                    src={currentGallery[currentIndex].media!.url}
                                    alt={`preview-${currentIndex}`}
                                    className="max-h-[80vh] w-full object-contain"
                                />
                            ) : isVideo(currentGallery[currentIndex].media!.url) ? (
                                <video controls className="max-h-[80vh] w-full">
                                    <source src={currentGallery[currentIndex].media!.url} />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <p className="text-center text-gray-700 dark:text-gray-300">Cannot preview this file.</p>
                            )}
                        </div>
                    </div>
                )}
            </PageLayout>
        </>
    );
};

export default GalleriesPage;
