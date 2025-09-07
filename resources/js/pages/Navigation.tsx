import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { SharedData } from '../types';

const Navigation = () => {
    const navItems = [
        { name: 'Attribute', href: '#attribute' },
        { name: 'Our Team', href: '#team' },
        { name: 'Our Partners', href: '#partners' },
        { name: 'Visit Museum', href: '#museum' },
    ];

    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false); // close mobile menu after click
    };

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="text-xl font-bold text-foreground">BULWARK</div>
                    <div className="rounded bg-foreground px-1 py-0.5 text-xs text-background">TM</div>
                </div>

                {/* Desktop nav */}
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

                {/* Auth & Donate buttons */}
                <div className="hidden items-center space-x-4 md:flex">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                    )}
                    <Link
                        href={route('register')}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Donate
                    </Link>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="rounded-md p-2 text-foreground hover:bg-foreground/10 md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile nav */}
            {mobileMenuOpen && (
                <div className="h-screen border-t border-border bg-background md:hidden">
                    <div className="flex flex-col space-y-4 px-6 py-4">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                className="text-left text-sm text-foreground hover:text-foreground/80"
                            >
                                {item.name}
                            </button>
                        ))}
                        <div className="mt-2 flex flex-col space-y-2">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="block rounded-sm border border-[#19140035] px-5 py-1.5 text-center text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="block rounded-sm border border-transparent px-5 py-1.5 text-center text-sm text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                            )}
                            <Link
                                href={route('register')}
                                className="block rounded-sm border border-[#19140035] px-5 py-1.5 text-center text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Donate
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
