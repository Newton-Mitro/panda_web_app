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
        <div className="flex min-h-screen items-center justify-center bg-background p-6 font-mono">
            <Head title="Forgot password" />

            <div className="w-full max-w-md rounded-lg border border-border bg-card p-6">
                {/* Logo + Intro */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <AppLogoIcon className="mb-3 h-20 w-20 fill-current text-primary" />
                    <div className="text-sm font-medium text-primary">Forgot password</div>
                    <div className="text-xs text-muted-foreground">Enter your email to receive a password reset link</div>
                </div>

                {/* Status message */}
                {status && <div className="mb-4 text-center text-sm font-medium text-primary">{status}</div>}

                <Form method="post" action={route('password.email')} className="space-y-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs text-muted-foreground">
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
                                    className="w-full rounded border border-border bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div>
                                <Button
                                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
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
                <div className="pt-6 text-center text-xs text-muted-foreground">
                    Or, return to{' '}
                    <TextLink href={route('login')} className="text-primary underline">
                        Log in
                    </TextLink>
                </div>
            </div>
        </div>
    );
}
