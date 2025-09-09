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
            <div className="min-h-screen bg-background">
                <Navigation />

                <main>
                    <AttributeSection />
                </main>

                <footer className="border-t border-border bg-background py-8">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-bold text-foreground">{appName}</div>
                                <span className="flex items-start rounded bg-foreground p-1">
                                    <AppLogoIcon className="h-4 w-4 text-background" />
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Copyright © 2024 Bulwark Foundation by Prakash Foundation</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
