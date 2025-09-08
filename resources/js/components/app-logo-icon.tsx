import { Link } from '@inertiajs/react';

export default function AppLogoIcon({ className = '' }: { className?: string }) {
    return (
        <Link href="/" className="inline-block">
            <img src="/logo.png" alt="App Logo" className={className} />
        </Link>
    );
}
