import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ConfirmPassword() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#07111a] font-mono">
            <Head title="Confirm password" />

            <div className="w-full max-w-md rounded-lg border border-white/5 bg-gradient-to-b from-[#061018] to-[#07121a] p-6 shadow-2xl">
                {/* Logo + Header */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <AppLogoIcon className="mb-3 h-20 w-20 fill-current text-white" />
                    <div className="text-sm font-medium text-green-300">Confirm your password</div>
                    <div className="text-xs text-gray-400">
                        This is a secure area of the application. Please confirm your password before continuing.
                    </div>
                </div>

                {/* Form */}
                <Form method="post" action={route('password.confirm')} resetOnSuccess={['password']} className="space-y-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <label className="mb-1 block text-xs text-green-200/80" htmlFor="password">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    autoFocus
                                    className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-green-200/30"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <Button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded bg-green-500/90 px-4 py-1.5 text-sm font-medium text-black hover:bg-green-500"
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
