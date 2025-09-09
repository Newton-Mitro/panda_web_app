import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6 font-mono">
            <Head title="Log in" />

            <div className="w-full max-w-md rounded-lg border border-border bg-card p-6">
                {/* Logo + Intro */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <AppLogoIcon className="mb-3 h-20 w-20 fill-current text-primary" />
                    <div className="text-sm font-medium text-primary">
                        Welcome back to <span className="text-foreground">SmartPanda</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Authenticate to continue</div>
                </div>

                {/* Form */}
                <Form method="post" action={route('login')} resetOnSuccess={['password']} disableWhileProcessing className="space-y-4">
                    {({ processing, errors }) => (
                        <>
                            {/* Email */}
                            <div>
                                <label className="mb-1 block text-xs text-muted-foreground">email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded border border-border bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-1 block text-xs text-muted-foreground">password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="w-full rounded border border-border bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-2 text-muted-foreground">
                                    <input type="checkbox" name="remember" className="h-4 w-4 accent-primary" />
                                    Remember me
                                </label>
                                {canResetPassword && (
                                    <a href={route('password.request')} className="text-primary underline">
                                        Forgot password?
                                    </a>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Log in
                            </button>

                            {/* Register link */}
                            <div className="pt-4 text-center text-xs text-muted-foreground">
                                Don’t have an account?{' '}
                                <Link href={route('register')} className="text-primary underline">
                                    Register
                                </Link>
                            </div>
                        </>
                    )}
                </Form>

                {/* Status Message */}
                {status && (
                    <div className="mt-4 rounded border border-border bg-muted p-2 text-center text-sm font-medium text-primary">{status}</div>
                )}
            </div>
        </div>
    );
}
