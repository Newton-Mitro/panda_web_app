import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#07111a] font-mono">
            <Head title="Reset password" />

            <div className="w-full max-w-md rounded-lg border border-white/5 bg-gradient-to-b from-[#061018] to-[#07121a] p-6 shadow-2xl">
                {/* Logo + Header */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <AppLogoIcon className="mb-3 h-20 w-20 fill-current text-white" />
                    <div className="text-sm font-medium text-green-300">Reset password</div>
                    <div className="text-xs text-gray-400">Please enter your new password below.</div>
                </div>

                <Form
                    method="post"
                    action={route('password.store')}
                    transform={(data) => ({ ...data, token, email })}
                    resetOnSuccess={['password', 'password_confirmation']}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs text-green-200/80">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    readOnly
                                    className="w-full rounded border border-green-900/30 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-green-200/30"
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-xs text-green-200/80">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    autoFocus
                                    placeholder="••••••••"
                                    className="w-full rounded border border-green-900/30 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-green-200/30"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirm Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-xs text-green-200/80">
                                    Confirm password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="w-full rounded border border-green-900/30 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-green-200/30"
                                />
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded bg-green-500/90 px-4 py-1.5 text-sm font-medium text-black hover:bg-green-500"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Reset password
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
