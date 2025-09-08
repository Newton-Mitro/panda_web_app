import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6 font-mono">
            <Head title="Email verification" />

            <div className="w-full max-w-md rounded-lg border border-border bg-card p-6">
                {/* Logo + Header */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <AppLogoIcon className="mb-3 h-20 w-20 fill-current text-primary" />
                    <div className="text-sm font-medium text-primary">Verify your email</div>
                    <div className="text-xs text-muted-foreground">Please verify your email address by clicking the link we just sent.</div>
                </div>

                {/* Status */}
                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-center text-sm font-medium text-primary">
                        A new verification link has been sent to the email address you provided during registration.
                    </div>
                )}

                {/* Form */}
                <Form method="post" action={route('verification.send')} className="space-y-6 text-center">
                    {({ processing }) => (
                        <>
                            <Button
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Resend verification email
                            </Button>

                            <Link href={route('logout')} method="post" className="block text-sm text-primary underline hover:opacity-80">
                                Log out
                            </Link>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
