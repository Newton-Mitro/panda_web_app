import { type ReactNode } from 'react';
import FooterTemplate from '../pages/site/FooterTemplate';
import Navigation from '../pages/site/Navigation';

interface PageLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: PageLayoutProps) => (
    <>
        <div className="flex min-h-screen flex-col bg-background" {...props}>
            <Navigation />

            {children}

            {/* Footer always at bottom */}
            <FooterTemplate />
        </div>
    </>
);
