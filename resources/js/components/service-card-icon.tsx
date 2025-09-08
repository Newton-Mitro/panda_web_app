import React from 'react';

interface ServiceCardIconProps {
    icon?: string;
    title?: string;
    text?: string;
    key: number;
}

const ServiceCardIcon: React.FC<ServiceCardIconProps> = ({ icon, title, text, key }) => {
    return (
        <div key={key} className="relative overflow-hidden rounded-lg border p-2 select-none hover:shadow">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                {icon && <i className={`fa-solid ${icon} text-5xl`} />}
                <div className="space-y-2">
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm">{text}</p>
                </div>
            </div>
        </div>

        // <div key={key} className="flex items-start gap-3 sm:flex-row">
        //     {item.icon && (
        //         <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--primary)] bg-[var(--primary)]/10">
        //             <i className={`fa-solid ${item.icon} text-xl text-[var(--primary)]`} />
        //         </div>
        //     )}

        //     <div className="flex flex-col gap-0.5 text-sm text-[var(--foreground)]">
        //         {item.title && <p className="font-semibold">{item.title}</p>}
        //         {item.subtitle && <p className="text-[var(--muted-foreground)]">{item.subtitle}</p>}
        //         {item.text && <p className="text-[var(--muted-foreground)]">{item.text}</p>}
        //     </div>
        // </div>
    );
};

export default ServiceCardIcon;
