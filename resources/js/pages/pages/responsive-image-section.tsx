import React from 'react';

interface ResponsiveImageSectionProps {
    mediaUrl?: string;
    mimeType?: string;
    contentHtml: string;
    shape?: 'tall-left' | 'tall-right' | 'octagon-left' | 'octagon-right';
}

const ResponsiveImageSection: React.FC<ResponsiveImageSectionProps> = ({ mediaUrl, mimeType, contentHtml, shape = 'tall-left' }) => {
    let clipPath = '';
    let floatClass = 'md:float-left';
    let marginClass = 'md:mr-6';

    switch (shape) {
        case 'tall-left':
            clipPath = 'polygon(0% 0%,0% 100%,100% 80%,100% 20%,0% 0%)';
            floatClass = 'md:float-left';
            marginClass = 'md:mr-6';
            break;
        case 'tall-right':
            clipPath = 'polygon(100% 0%,100% 100%,0% 80%,0% 20%,100% 0%)';
            floatClass = 'md:float-right';
            marginClass = 'md:ml-6';
            break;
        case 'octagon-left':
            clipPath = 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)';
            floatClass = 'md:float-left';
            marginClass = 'md:mr-6';
            break;
        case 'octagon-right':
            clipPath = 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)';
            floatClass = 'md:float-right';
            marginClass = 'md:ml-6';
            break;
    }

    const renderMedia = () => {
        if (!mediaUrl || !mimeType) return null;

        const sharedProps = {
            style: { clipPath, shapeOutside: clipPath },
            className: `h-72 object-cover shadow-lg transition-transform duration-300 md:h-96 md:w-96 mt-6 mb-6 hover:scale-105 ${floatClass} ${marginClass}`,
        };

        if (mimeType.startsWith('image/')) {
            return <img src={mediaUrl} alt="Custom Shape" {...sharedProps} />;
        }

        if (mimeType.startsWith('video/')) {
            // Note: clip-path won't affect video text wrapping; usually shape-outside works only with floated elements and images.
            return <video src={mediaUrl} controls {...sharedProps} className={`${sharedProps.className} w-full md:w-[500px]`} />;
        }

        return null;
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
