import { Head } from '@inertiajs/react';
import AppLogoIcon from '../../components/app-logo-icon';
import Navigation from './Navigation';
import AttributeSection from './sections/AttributeSection';

export default function About() {
    const appName = import.meta.env.VITE_APP_NAME || 'SmartPanda'; // fallback

    // Define the services array

    return (
        <>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col bg-background">
                <Navigation />

                <main className="m-16">
                    <div className="m-16 mx-auto max-w-6xl rounded border">
                        <AttributeSection />
                    </div>
                </main>

                {/* Footer always at bottom */}
                <footer className="mt-auto border-t border-border bg-background py-8">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-bold text-foreground">{appName}</div>
                                <span className="flex items-start rounded bg-foreground p-1">
                                    <AppLogoIcon className="h-4 w-4 text-background" />
                                </span>
                            </div>
                            <p className="text-center text-xs text-muted-foreground md:text-right">
                                Copyright © 2024 Bulwark Foundation by Prakash Foundation
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
