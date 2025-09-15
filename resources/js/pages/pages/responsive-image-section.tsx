import React from 'react';

interface ResponsiveImageSectionProps {
    mediaUrl?: string;
    mimeType?: string; // e.g., "image/jpeg", "video/mp4"
    contentHtml: string;
    shape?: 'tall-left' | 'tall-right' | 'octagon-left' | 'octagon-right';
}

const ResponsiveImageSection: React.FC<ResponsiveImageSectionProps> = ({ mediaUrl, mimeType, contentHtml, shape = 'tall-left' }) => {
    // Determine clip-path and float based on shape
    let clipPath = '';
    let shapeOutside = '';
    let floatClass = 'md:float-left';
    let marginClass = 'md:mr-6';

    switch (shape) {
        case 'tall-left':
            clipPath = 'polygon(0%_0%,0%_100%,100%_80%,100%_20%,0%_0%)';
            shapeOutside = clipPath;
            floatClass = 'md:float-left';
            marginClass = 'md:mr-6';
            break;
        case 'tall-right':
            clipPath = 'polygon(100%_0%,100%_100%,0%_80%,0%_20%,100%_0%)';
            shapeOutside = clipPath;
            floatClass = 'md:float-right';
            marginClass = 'md:ml-6';
            break;
        case 'octagon-left':
            clipPath = 'polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)';
            shapeOutside = clipPath;
            floatClass = 'md:float-left';
            marginClass = 'md:mr-6';
            break;
        case 'octagon-right':
            clipPath = 'polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)';
            shapeOutside = clipPath;
            floatClass = 'md:float-right';
            marginClass = 'md:ml-6';
            break;
    }

    const renderMedia = () => {
        if (!mediaUrl || !mimeType) return null;

        if (mimeType.startsWith('image/')) {
            return (
                <img
                    src={mediaUrl}
                    alt="Custom Shape"
                    className={`h-72 w-full object-cover shadow-lg transition-transform duration-300 md:h-96 md:w-96 ${floatClass} ${marginClass} mt-6 mb-6 [clip-path:${clipPath}] [shape-outside:${shapeOutside}] hover:scale-105`}
                />
            );
        }

        if (mimeType.startsWith('video/')) {
            return (
                <video
                    src={mediaUrl}
                    controls
                    className={`h-72 w-full shadow-lg transition-transform duration-300 md:h-96 md:w-96 ${floatClass} ${marginClass} mt-6 mb-6 hover:scale-105`}
                />
            );
        }

        return null; // unsupported mime type
    };

    return (
        <div className="clear-both mb-10">
            <div className="relative">
                {renderMedia()}
                <div
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                    className="prose prose-sm [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                />
            </div>
        </div>
    );
};

export default ResponsiveImageSection;
