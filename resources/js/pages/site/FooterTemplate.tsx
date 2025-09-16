import AppLogoIcon from '../../components/app-logo-icon';

function FooterTemplate() {
    const appName = import.meta.env.VITE_APP_NAME || 'SmartPanda'; // fallback
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
                    <p className="text-center text-xs text-muted-foreground md:text-right">
                        Copyright © 2024 Bulwark Foundation by Prakash Foundation
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default FooterTemplate;
