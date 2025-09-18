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
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary bg-primary p-6">
                    <i className={`${icon} text-xl text-primary-foreground`}></i>
                </div>
            )}

            <div className="flex flex-col gap-0.5 text-sm text-foreground">
                {title && <h4 className="text-xl font-semibold">{title}</h4>}
                {text && <p className="text-muted-foreground">{text}</p>}
            </div>
        </div>
    );
};

export default ServiceCardLeftIcon;
