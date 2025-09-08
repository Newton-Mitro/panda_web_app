import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ConfirmPassword() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6 font-mono">
            <Head title="Confirm password" />

            <div className="w-full max-w-md rounded-lg border border-border bg-card p-6">
                {/* Logo + Header */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <AppLogoIcon className="mb-3 h-20 w-20 fill-current text-primary" />
                    <div className="text-sm font-medium text-primary">Confirm your password</div>
                    <div className="text-xs text-muted-foreground">
                        This is a secure area of the application. Please confirm your password before continuing.
                    </div>
                </div>

                {/* Form */}
                <Form method="post" action={route('password.confirm')} resetOnSuccess={['password']} className="space-y-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <label className="mb-1 block text-xs text-muted-foreground" htmlFor="password">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    autoFocus
                                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <Button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Confirm password
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
