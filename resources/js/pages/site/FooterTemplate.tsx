import { Link } from '@inertiajs/react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import AppLogoIcon from '../../components/app-logo-icon';

function FooterTemplate() {
    const appName = import.meta.env.VITE_APP_NAME || 'SmartPanda';

    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-border bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-6 py-10">
                {/* Top Section */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Branding */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2">
                            <span className="rounded bg-foreground p-1">
                                <AppLogoIcon className="h-5 w-5 text-background" />
                            </span>
                            <span className="text-lg font-bold">{appName}</span>
                        </div>
                        <p className="mt-3 text-center text-sm text-muted-foreground md:text-left">
                            Empowering digital innovation with smart solutions tailored for your success.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="mb-4 text-sm font-semibold text-foreground uppercase">Other Links</h4>
                        <nav className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:flex-row">
                            <Link href="/terms-of-service" className="hover:underline">
                                Terms of Service
                            </Link>
                            <Link href="/privacy-policy" className="hover:underline">
                                Privacy
                            </Link>
                            <Link href="/disclaimer" className="hover:underline">
                                Disclaimer
                            </Link>
                        </nav>
                    </div>

                    {/* Social Media */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="mb-3 text-sm font-semibold text-foreground uppercase">Follow Us</h4>
                        <div className="flex gap-4 text-muted-foreground">
                            <a href="#" className="rounded-full p-2 hover:bg-muted hover:text-foreground">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="rounded-full p-2 hover:bg-muted hover:text-foreground">
                                <FaTwitter />
                            </a>
                            <a href="#" className="rounded-full p-2 hover:bg-muted hover:text-foreground">
                                <FaLinkedinIn />
                            </a>
                            <a href="#" className="rounded-full p-2 hover:bg-muted hover:text-foreground">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-4 text-center text-xs text-muted-foreground">
                    © {currentYear} {appName}. Developed by{' '}
                    <a href="https://denton.studio" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                        denton.studio
                    </a>
                    . All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default FooterTemplate;
