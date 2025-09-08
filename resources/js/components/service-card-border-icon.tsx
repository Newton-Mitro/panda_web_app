import React from 'react';

interface ServiceCardBorderIconProps {
    icon?: string; // FontAwesome icon class or SVG string
    title?: string;
    text?: string;
}

const ServiceCardBorderIcon: React.FC<ServiceCardBorderIconProps> = ({ icon, title, text }) => {
    return (
        <div className="relative col-span-4 flex flex-col items-center justify-start rounded-xl border-2 border-[var(--border)] px-5 pt-10 pb-2 text-[var(--foreground)] transition-transform duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-lg sm:col-span-2 lg:col-span-1">
            {/* Icon Circle */}
            <span className="absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-[var(--primary)] p-3 transition-colors duration-300 hover:bg-[var(--primary)] hover:text-[var(--background)]">
                {icon && <i className={`fa-solid ${icon} text-xl text-[var(--background)]`} />}
            </span>

            {/* Title */}
            {title && (
                <h2 className="my-1 text-base font-semibold text-[var(--primary)] uppercase transition-colors duration-300 hover:text-[var(--accent)]">
                    {title}
                </h2>
            )}

            {/* Text */}
            {text && <p className="py-2 text-center text-sm text-[var(--muted-foreground)]">{text}</p>}
        </div>
    );
};

export default ServiceCardBorderIcon;
