import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLogoIcon from '../../components/app-logo-icon';
import { SharedData } from '../../types';

const Navigation = () => {
    const navItems = [
        { name: 'About', href: '/about' },
        { name: 'Attribute', href: '/attribute' },
        { name: 'Our Team', href: '/team' },
        { name: 'Our Partners', href: '/partners' },
        { name: 'Visit Museum', href: '/museum' },
    ];

    const page = usePage<SharedData>();
    const { auth } = page.props;
    const url = page.url;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const appName = import.meta.env.VITE_APP_NAME || 'SmartPanda';

    // Active link check based on current URL
    const isActive = (href: string) => {
        console.log(url, href);
        return url === href;
    };

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="text-xl font-bold text-foreground">{appName}</div>
                    <span className="flex items-start rounded bg-foreground p-1">
                        <AppLogoIcon className="h-4 w-4 text-background" />
                    </span>
                </div>

                {/* Desktop nav */}
                <div className="hidden items-center space-x-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`cursor-pointer text-sm transition-colors hover:text-foreground/80 ${
                                isActive(item.href) ? 'border-b-2 border-primary text-primary' : 'text-foreground'
                            }`}
                        >
                            {item.name}
                        </Link>
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
                <div className="flex h-screen flex-col items-center justify-center space-y-4 border-t border-border bg-background px-6 py-4 md:hidden">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-left text-sm transition-colors hover:text-foreground/80 ${
                                isActive(item.href) ? 'border-b-2 border-primary text-primary' : 'text-foreground'
                            }`}
                        >
                            {item.name}
                        </Link>
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
            )}
        </nav>
    );
};

export default Navigation;
