import React from 'react';

interface ImageWrappedContentSectionProps {
    mediaUrl?: string;
    mimeType?: string;
    contentHtml: string;
    shape?: 'tall-left' | 'tall-right' | 'octagon-left' | 'octagon-right';
}

const ImageWrappedContentSection: React.FC<ImageWrappedContentSectionProps> = ({ mediaUrl, mimeType, contentHtml, shape = 'tall-left' }) => {
    let clipPath = '';
    let marginClass = 'md:mr-6';

    switch (shape) {
        case 'tall-left':
            clipPath = 'polygon(0% 0%,0% 100%,100% 80%,100% 20%,0% 0%)';
            marginClass = 'md:mr-6 md:float-left';
            break;
        case 'tall-right':
            clipPath = 'polygon(100% 0%,100% 100%,0% 80%,0% 20%,100% 0%)';
            marginClass = 'md:ml-6 md:float-right';
            break;
        case 'octagon-left':
            clipPath = 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)';
            marginClass = 'md:mr-6 md:float-left';
            break;
        case 'octagon-right':
            clipPath = 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)';
            marginClass = 'md:ml-6 md:float-right';
            break;
    }

    const renderMedia = () => {
        if (!mediaUrl || !mimeType) return null;

        const baseClass =
            'mx-auto mb-6 mt-6 h-80 w-80 bg-card object-cover transition-transform duration-500 hover:scale-105 md:h-[500px] md:w-[500px]';
        const className = `${baseClass} ${marginClass}`;

        const style = { clipPath, shapeOutside: clipPath };

        if (mimeType.startsWith('image/')) {
            return <img src={mediaUrl} alt="Custom Shape" className={className} style={style} />;
        }

        if (mimeType.startsWith('video/')) {
            return <video src={mediaUrl} controls className={`${className} w-full md:w-[500px]`} style={style} />;
        }

        return null;
    };

    return (
        <>
            <div className="mb-10">
                {renderMedia()}
                <div
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                    className="prose prose-sm max-w-none text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                />
            </div>
            <div className="clear-both"></div>
        </>
    );
};

export default ImageWrappedContentSection;
