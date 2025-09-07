import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#07111a] font-mono">
            <Head title="Email verification" />

            <div className="w-full max-w-md rounded-lg border border-white/5 bg-gradient-to-b from-[#061018] to-[#07121a] p-6 shadow-2xl">
                {/* Logo + Header */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <AppLogoIcon className="mb-3 h-20 w-20 fill-current text-white" />
                    <div className="text-sm font-medium text-green-300">Verify your email</div>
                    <div className="text-xs text-gray-400">Please verify your email address by clicking the link we just sent.</div>
                </div>

                {/* Status */}
                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-center text-sm font-medium text-green-500">
                        A new verification link has been sent to the email address you provided during registration.
                    </div>
                )}

                {/* Form */}
                <Form method="post" action={route('verification.send')} className="space-y-6 text-center">
                    {({ processing }) => (
                        <>
                            <Button
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded bg-green-500/90 px-4 py-1.5 text-sm font-medium text-black hover:bg-green-500"
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Resend verification email
                            </Button>

                            <Link href={route('logout')} method="post" className="block text-sm text-green-300 underline hover:text-green-200">
                                Log out
                            </Link>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
