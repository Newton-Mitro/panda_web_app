import React from 'react';

interface IconCardProps {
    icon?: string; // FontAwesome icon class or SVG string
    title?: string;
    text?: string;
}

const IconCardItem: React.FC<IconCardProps> = ({ icon, title, text }) => {
    return (
        <div className="group relative flex flex-col items-center justify-start rounded-xl border-1 border-border bg-card px-5 pt-10 pb-2 text-foreground transition-transform duration-300 group-hover:border-primary hover:-translate-y-1 hover:cursor-pointer hover:shadow md:h-full">
            {/* Icon Circle */}
            <span className="absolute -top-6 flex size-12 items-center justify-center rounded-full border-1 border-border bg-card p-3 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground md:-top-9 md:size-16">
                {icon && <i className={`fa-solid ${icon} text-xl text-card-foreground group-hover:text-primary-foreground`} />}
            </span>

            {/* Title */}
            {title && (
                <h2 className="my-1 text-base font-semibold text-card-foreground uppercase transition-colors duration-300 group-hover:text-primary md:text-lg">
                    {title}
                </h2>
            )}

            {/* Text */}
            {text && <p className="py-2 text-center text-sm text-muted-foreground">{text}</p>}
        </div>
    );
};

export default IconCardItem;
