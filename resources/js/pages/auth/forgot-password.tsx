// Components
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#07111a] font-mono">
            <Head title="Forgot password" />

            <div className="w-full max-w-md rounded-lg border border-white/5 bg-gradient-to-b from-[#061018] to-[#07121a] p-6 shadow-2xl">
                {/* Logo + Intro Centered */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <AppLogoIcon className="mb-3 h-20 w-20 fill-current text-white" />
                    <div className="text-sm font-medium text-green-300">Forgot password</div>
                    <div className="text-xs text-gray-400">Enter your email to receive a password reset link</div>
                </div>

                {/* Status message */}
                {status && <div className="mb-4 text-center text-sm font-medium text-green-500">{status}</div>}

                <Form method="post" action={route('password.email')} className="space-y-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs text-green-200/80">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    autoComplete="off"
                                    placeholder="email@example.com"
                                    className="w-full rounded border border-green-900/30 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-green-200/30"
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div>
                                <Button
                                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-green-500/90 px-4 py-1.5 text-sm font-medium text-black hover:bg-green-500"
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Email password reset link
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                {/* Back to login */}
                <div className="pt-6 text-center text-xs text-gray-400">
                    Or, return to{' '}
                    <TextLink href={route('login')} className="text-green-300 underline">
                        Log in
                    </TextLink>
                </div>
            </div>
        </div>
    );
}
