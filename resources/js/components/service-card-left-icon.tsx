import React from 'react';

interface ServiceCardLeftIconProps {
    icon?: string;
    title?: string;
    text?: string;
    key: number;
}

const ServiceCardLeftIcon: React.FC<ServiceCardLeftIconProps> = ({ icon, title, text, key }) => {
    return (
        <div key={key} className="flex items-start gap-3 sm:flex-row">
            {icon && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--primary)] p-6">
                    <i className={`fa-solid ${icon} text-xl text-[var(--primary)]`}></i>
                </div>
            )}

            <div className="flex flex-col gap-0.5 text-sm text-[var(--foreground)]">
                {title && <p className="font-semibold">{title}</p>}
                {text && <p className="text-[var(--muted-foreground)]">{text}</p>}
            </div>
        </div>
    );
};

export default ServiceCardLeftIcon;
