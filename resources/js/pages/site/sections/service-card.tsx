import React from 'react';
import { Service } from '../../../types/service';

interface ServiceCardProps {
    service: Service;
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
    return (
        <div className="group flex cursor-pointer flex-col items-center md:relative md:flex-row">
            {index % 2 === 0 ? (
                <div
                    className={`group clear-both flex w-full ${index % 2 !== 0 ? 'flex-col-reverse' : 'flex-col'} items-center group-hover:cursor-pointer md:relative md:flex-row`}
                >
                    <img
                        src={service?.media?.url ?? 'https://t3.ftcdn.net/jpg/01/06/12/68/360_F_106126874_6Yl8PyFmYgoOAx7DYoH6zs5a3MoFvQHr.jpg'}
                        alt="Custom Shape"
                        style={{
                            clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                        }}
                        className={`borderobject-cover z-10 mt-6 mb-6 h-72 w-72 border-6 bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96`}
                        // border-4 for thickness, border-blue-500 for color, adjust as needed
                    />
                    <div className="flex min-h-62 w-full flex-col justify-center rounded-2xl border-1 border-border bg-card p-6 md:ml-72 md:pl-32">
                        <div className="">
                            <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                            <p className="text-sm font-semibold text-primary">{service.category?.name}</p>

                            <div className="prose prose-sm mt-3 text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500">
                                {service.description || 'No bio available.'}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`group clear-both flex w-full ${index % 2 !== 0 ? 'flex-col-reverse' : 'flex-col'} items-center group-hover:cursor-pointer md:relative md:flex-row`}
                >
                    <div className="flex min-h-62 w-full flex-col justify-center rounded-2xl border-1 border-border bg-card p-6 md:mr-72 md:pr-32">
                        <div className="flex flex-col items-end justify-center text-right">
                            <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                            <p className="text-sm font-semibold text-primary">{service.category?.name}</p>

                            <div className="prose prose-sm mt-3 text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500">
                                {service.description || 'No bio available.'}
                            </div>
                        </div>
                    </div>
                    <img
                        src={service?.media?.url}
                        alt="Custom Shape"
                        style={{
                            clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                        }}
                        className={`borderobject-cover right-0 z-10 mt-6 mb-6 h-72 w-72 border-6 bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96`}
                        // border-4 for thickness, border-blue-500 for color, adjust as needed
                    />
                </div>
            )}
        </div>
    );
};

export default ServiceCard;
