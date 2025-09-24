import { ArrowUp } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import FooterTemplate from '../pages/site/FooterTemplate';
import Navigation from '../pages/site/Navigation';

interface PageLayoutProps {
    children: ReactNode;
}

export default function PageLayout({ children, ...props }: PageLayoutProps) {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex min-h-screen flex-col bg-background" {...props}>
            <Navigation />

            <main className="flex-grow">{children}</main>

            {/* Fixed Social Icons */}
            <div className="fixed top-1/2 right-4 z-40 -translate-y-1/2 space-y-4">
                {[
                    { href: 'https://facebook.com', icon: <FaFacebookF />, label: 'Facebook', color: 'text-blue-500' },
                    { href: 'https://twitter.com', icon: <FaTwitter />, label: 'Twitter', color: 'text-sky-400' },
                    { href: 'https://wa.me', icon: <FaWhatsapp />, label: 'WhatsApp', color: 'text-green-500' },
                    { href: 'https://youtube.com', icon: <FaYoutube />, label: 'YouTube', color: 'text-red-500' },
                ].map((item, idx) => (
                    <a
                        key={idx}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-end space-x-2"
                    >
                        {/* Text label */}
                        <span
                            className={`absolute right-8 text-xs font-medium whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-x-[-8px] group-hover:opacity-100 ${item.color}`}
                        >
                            {item.label}
                        </span>
                        {/* Icon */}
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted-foreground/10 text-muted-foreground transition-all duration-300 hover:translate-x-[-8px] hover:bg-muted-foreground/20 hover:text-foreground">
                            {item.icon}
                        </span>
                    </a>
                ))}
            </div>

            {/* Scroll to Top Button */}
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed right-8 bottom-8 z-50 rounded-full bg-primary p-3 text-white shadow-lg transition hover:bg-primary/80"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-5 w-5" />
                </button>
            )}

            <FooterTemplate />
        </div>
    );
}
