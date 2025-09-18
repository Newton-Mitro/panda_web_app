import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '../../components/app-logo-icon';
import { SharedData } from '../../types';

function FooterTemplate() {
    const appName = import.meta.env.VITE_APP_NAME || 'SmartPanda'; // fallback
    const page = usePage<SharedData>();
    const { auth } = page.props;
    return (
        <footer className="mt-auto border-t border-border bg-background py-8">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                    <div className="flex items-center space-x-2">
                        <div className="text-sm font-bold text-foreground">{appName}</div>
                        <span className="flex items-start rounded bg-foreground p-1">
                            <AppLogoIcon className="h-4 w-4 text-background" />
                        </span>
                    </div>
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
                            Webmaster Login
                        </Link>
                    )}
                    <p className="text-center text-xs text-muted-foreground md:text-right">
                        Copyright © 2024 Bulwark Foundation by Prakash Foundation
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default FooterTemplate;
