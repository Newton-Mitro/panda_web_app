import { Link, usePage } from '@inertiajs/react';
import { Button } from '../components/ui/button';
import { SharedData } from '../types';

const Navigation = () => {
    const navItems = [
        { name: 'Attribute', href: '#attribute' },
        { name: 'Our Team', href: '#team' },
        { name: 'Our Partners', href: '#partners' },
        { name: 'Visit Museum', href: '#museum' },
    ];

    const { auth } = usePage<SharedData>().props;

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="text-xl font-bold text-foreground">BULWARK</div>
                        <div className="rounded bg-foreground px-1 py-0.5 text-xs text-background">TM</div>
                    </div>

                    <div className="hidden items-center space-x-8 md:flex">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                className="cursor-pointer text-sm text-foreground transition-colors hover:text-foreground/80"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <div className="">
                        <header className="">
                            <nav className="flex gap-6">
                                <Button size="sm" className="tracking-wider uppercase">
                                    Donate
                                </Button>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
