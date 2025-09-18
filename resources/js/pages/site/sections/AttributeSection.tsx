import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AttributeSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} id="attribute" className="bg-background py-16 md:py-20">
            <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <div className="flex flex-col gap-10">
                    <div className="group flex flex-col items-center group-hover:cursor-pointer md:relative md:flex-row">
                        <img
                            src="http://localhost:8000/storage/uploads/28.jpg"
                            alt="Custom Shape"
                            style={{
                                clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                            }}
                            className={`borderobject-cover z-10 mt-6 mb-6 h-72 w-72 border-6 shadow-lg transition-transform duration-300 group-hover:scale-105 md:h-96 md:w-96`}
                            // border-4 for thickness, border-blue-500 for color, adjust as needed
                        />
                        <div className="flex h-62 flex-col justify-center rounded-2xl border-1 border-gray-200 bg-white p-6 md:absolute md:left-80 md:pl-20">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, ab. Corrupti deserunt maiores, eveniet culpa itaque
                                quaerat, inventore recusandae cumque, animi porro nulla voluptate numquam totam maxime officia fugiat explicabo?
                            </p>
                        </div>
                    </div>

                    <div className="group flex flex-col items-center group-hover:cursor-pointer md:relative md:flex-row">
                        <div className="flex h-62 flex-col justify-center rounded-2xl border-1 border-gray-200 bg-white p-6 md:mr-80 md:pr-20">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, ab. Corrupti deserunt maiores, eveniet culpa itaque
                                quaerat, inventore recusandae cumque, animi porro nulla voluptate numquam totam maxime officia fugiat explicabo?
                            </p>
                        </div>
                        <img
                            src="http://localhost:8000/storage/uploads/28.jpg"
                            alt="Custom Shape"
                            style={{
                                clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                            }}
                            className={`borderobject-cover right-0 z-10 mt-6 mb-6 h-72 w-72 border-6 shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96`}
                            // border-4 for thickness, border-blue-500 for color, adjust as needed
                        />
                    </div>
                </div>

                {/* <div className="grid items-start gap-8 sm:gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
                    <div className="text-center md:text-left">
                        <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl md:text-left">Attribute</h2>
                        <div className="mx-auto mb-8 h-1 w-16 bg-foreground md:mx-0"></div>
                        <p className="mb-4 leading-relaxed text-muted-foreground sm:mb-6">Bulwark foundation introduces Attributes.</p>
                        <p className="mb-4 leading-relaxed text-muted-foreground sm:mb-6">
                            Grow through Attributes to the foundation to find your account. Bulwark foundation welcomes you consider your image and
                            news virtual community.
                        </p>
                        <p className="mb-6 leading-relaxed text-muted-foreground sm:mb-8">Join attribute and express your support how.</p>

                        <div className="flex flex-col items-center justify-center space-y-2 text-sm sm:flex-row sm:items-start sm:justify-start sm:space-y-0 sm:space-x-2">
                            <span className="text-muted-foreground">Visit attributes</span>
                            <span className="font-bold text-foreground">5,843</span>
                            <span className="text-muted-foreground">Published now</span>
                        </div>
                    </div>

                    <div className="mx-auto my-auto hidden h-32 w-[1px] bg-border md:block"></div>

                    <div className="flex justify-center md:justify-end">
                        <div className="bg-bulwark-accent border-bulwark-green-light flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed md:h-80 md:w-80">
                            <img src="/storage/uploads/2.jpg" alt="attribute" className="h-full w-full rounded-2xl object-cover p-2" />
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default AttributeSection;
