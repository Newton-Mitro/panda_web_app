import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLogoIcon from '../../components/app-logo-icon';
import { SharedData } from '../../types';

const Navigation = () => {
    const navItems = [
        { name: 'Home', label: 'home', href: '/' },
        {
            name: 'About Us',
            label: 'about-us',
            href: '#',
            children: [
                { name: 'Our Story', label: 'our-story', href: '/about-us/our-story' },
                { name: 'Mission & Vision', label: 'mission-vision', href: '/about-us/mission-vision' },
                { name: 'Our Team', label: 'team', href: '/about-us/team' },
                { name: 'Careers', label: 'careers', href: '/about-us/careers' },
            ],
        },
        { name: 'Services', label: 'services', href: '/services' },
        // {
        //     name: 'Finance Options',
        //     label: 'finance-options',
        //     href: '#',
        //     children: [
        //         { name: 'CAPEX Model', label: 'capex-model', href: '/finance-options/capex-model' },
        //         { name: 'OPEX Model', label: 'opex-model', href: '/finance-options/opex-model' },
        //         { name: 'Debt Model', label: 'debt-model', href: '/finance-options/debt-model' },
        //     ],
        // },
        { name: 'Projects', label: 'projects', href: '/projects' },
        { name: 'FAQ', label: 'faq', href: '/faq' },
        { name: 'Notices', label: 'notices', href: '/notices' },
        { name: 'Galleries', label: 'galleries', href: '/galleries' },
        {
            name: 'More',
            label: 'more',
            href: '#',
            children: [
                { name: 'Articles', label: 'articles', href: '/articles' },
                { name: 'Doctors', label: 'doctors', href: '/doctors' },
                { name: 'Appointment', label: 'appointment', href: '/appointment' },
                { name: 'Courses', label: 'courses', href: '/courses' },
            ],
        },
    ];

    const { props } = usePage<SharedData>();
    const auth = props.auth;

    const page = usePage<SharedData>();
    const url = page.url;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
    const appName = import.meta.env.VITE_APP_NAME || 'SmartPanda';

    const isActive = (menu: any) => {
        console.log(menu);
        console.log(url);

        return url === menu.href || url.startsWith(`/${menu.label}`);
    };

    const toggleSubmenu = (name: string) => {
        setExpandedMenus((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
    };

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="group flex items-center space-x-2 group-hover:cursor-pointer">
                    <div className="text-xl font-bold text-foreground">{appName}</div>
                    <span className="flex items-start rounded bg-foreground p-1">
                        <AppLogoIcon className="h-4 w-4 text-background" />
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden items-center space-x-4 md:flex">
                    {navItems.map((item) =>
                        item.children ? (
                            <div key={item.name} className="group relative">
                                <Link
                                    href={item.href}
                                    className={`cursor-pointer text-sm transition-colors hover:text-foreground/80 ${
                                        isActive(item) ? 'border-b-2 border-primary text-primary' : 'text-foreground'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                                {/* Dropdown */}
                                <div className="absolute top-full left-0 hidden min-w-[180px] flex-col rounded-md border border-border bg-background shadow-md group-hover:flex">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.name}
                                            href={child.href}
                                            className={`px-4 py-2 text-sm hover:bg-muted ${
                                                isActive(child) ? 'font-medium text-primary' : 'text-foreground'
                                            }`}
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`cursor-pointer text-sm transition-colors hover:text-foreground/80 ${
                                    isActive(item) ? 'border-b-2 border-primary text-primary' : 'text-foreground'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ),
                    )}
                </div>

                {/* Auth & Contact */}
                <div className="hidden items-center space-x-4 md:flex">
                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Login
                        </Link>
                    )}
                    <Link
                        href="/contact-us"
                        className={`${
                            isActive('/contact-us') ? 'bg-primary text-primary-foreground' : 'text-foreground'
                        } inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]`}
                    >
                        Contact Us
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
                <div className="flex flex-col space-y-2 border-t border-border bg-background px-6 py-4 md:hidden">
                    {navItems.map((item) =>
                        item.children ? (
                            <div key={item.name} className="w-full">
                                <button
                                    onClick={() => toggleSubmenu(item.name)}
                                    className="flex w-full items-center justify-between py-2 text-left text-sm font-medium text-foreground hover:text-foreground/80"
                                >
                                    {item.name}
                                    <span>{expandedMenus.includes(item.name) ? '−' : '+'}</span>
                                </button>
                                {expandedMenus.includes(item.name) && (
                                    <div className="ml-4 flex flex-col space-y-1 border-l border-border pl-3">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className={`py-1 text-sm hover:text-foreground/80 ${
                                                    isActive(child) ? 'font-medium text-primary' : 'text-foreground'
                                                }`}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`py-2 text-sm hover:text-foreground/80 ${isActive(item) ? 'font-medium text-primary' : 'text-foreground'}`}
                            >
                                {item.name}
                            </Link>
                        ),
                    )}

                    <div className="mt-4 flex flex-col space-y-2">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm text-foreground hover:border-muted"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm text-foreground hover:border-muted"
                            >
                                Login
                            </Link>
                        )}
                        <Link
                            href="/contact-us"
                            className={`${
                                isActive('/contact-us') ? 'bg-primary text-primary-foreground' : 'text-foreground'
                            } inline-block rounded-sm border border-border px-5 py-1.5 text-sm hover:border-muted`}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
