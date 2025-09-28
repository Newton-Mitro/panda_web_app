import { X } from 'lucide-react';
import React, { useState } from 'react';

interface SectionGalleryProps {
    gallery: string[];
}

const SectionGallery: React.FC<SectionGalleryProps> = ({ gallery }) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
    const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

    const prev = () => {
        if (currentIndex !== null) {
            setCurrentIndex((currentIndex - 1 + gallery.length) % gallery.length);
        }
    };

    const next = () => {
        if (currentIndex !== null) {
            setCurrentIndex((currentIndex + 1) % gallery.length);
        }
    };

    return (
        <>
            <section id="attribute" className="my-16">
                <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6`}>
                    <div className="flex flex-wrap justify-evenly gap-6">
                        {gallery.map((attachment, index) => (
                            <div
                                key={index}
                                className="group relative h-80 w-80 overflow-hidden transition-all duration-500"
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', // octagon example
                                }}
                            >
                                {/* Image */}
                                {isImage(attachment) ? (
                                    <img
                                        src={attachment}
                                        className="absolute inset-0 h-full w-full bg-card object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : isVideo(attachment) ? (
                                    <video src={attachment} className="h-full w-full object-cover" muted playsInline />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-card text-xs text-card-foreground">File</div>
                                )}

                                {/* Border Frame */}
                                <div
                                    className="pointer-events-none absolute inset-0 border-2 border-white/30"
                                    style={{
                                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                                    }}
                                ></div>
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
                        {isImage(gallery[currentIndex]) ? (
                            <img src={gallery[currentIndex]} alt={`preview-${currentIndex}`} className="max-h-[80vh] w-full object-contain" />
                        ) : isVideo(gallery[currentIndex]) ? (
                            <video controls className="max-h-[80vh] w-full">
                                <source src={gallery[currentIndex]} />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <p className="text-center text-gray-700 dark:text-gray-300">Cannot preview this file.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default SectionGallery;
