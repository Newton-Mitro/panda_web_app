import React from 'react';

interface ImageContentBlockProps {
    imageUrl?: string;
    content?: string | null;
    reverse?: boolean; // when true → image on right, text on left
}

const ImageContentBlock: React.FC<ImageContentBlockProps> = ({ imageUrl, content, reverse = false }) => {
    const containerClass = reverse ? 'flex flex-col items-center gap-16 md:flex-row-reverse' : 'flex flex-col items-center gap-16 md:flex-row';

    const imageClass = reverse
        ? 'mt-6 mb-6 mx-auto h-80 w-80 bg-card object-cover transition-transform duration-300 hover:scale-110 md:ml-6 md:h-[500px] md:w-[500px]'
        : 'mt-6 mb-6 mx-auto h-80 w-80 bg-card object-cover transition-transform duration-300 hover:scale-110 md:mr-6 md:h-[500px] md:w-[500px]';

    const clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';

    return (
        <div className={containerClass}>
            <img alt="Custom Shape" src={imageUrl} className={imageClass} style={{ clipPath, shapeOutside: clipPath }} />

            <div
                className="prose prose-sm max-w-none text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                dangerouslySetInnerHTML={{ __html: content || '' }}
            />
        </div>
    );
};

export default ImageContentBlock;
