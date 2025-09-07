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
        <div className="flex min-h-screen items-center justify-center bg-[#07111a] font-mono">
            <Head title="Log in" />

            <div className="w-full max-w-md rounded-lg border border-white/5 bg-gradient-to-b from-[#061018] to-[#07121a] p-6 shadow-2xl">
                {/* Logo + Intro Centered */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <AppLogoIcon className="mb-3 h-20 w-20 fill-current text-white" />
                    <div className="text-sm font-medium text-green-300">
                        Login to <span className="text-white">PandaWeb</span>
                    </div>
                    <div className="text-xs text-gray-400">Authenticate to continue</div>
                </div>

                {/* Form */}
                <Form method="post" action={route('login')} resetOnSuccess={['password']} className="space-y-4">
                    {({ processing, errors }) => (
                        <>
                            {/* Email */}
                            <div>
                                <label className="mb-1 block text-xs text-green-200/80">email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded border border-green-900/30 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-green-200/30"
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-1 block text-xs text-green-200/80">password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="w-full rounded border border-green-900/30 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-green-200/30"
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-2 text-green-200/70">
                                    <input type="checkbox" name="remember" className="h-4 w-4 accent-green-400" />
                                    Remember me
                                </label>
                                {canResetPassword && (
                                    <a href={route('password.request')} className="text-green-300 underline">
                                        Forgot password?
                                    </a>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded bg-green-500/90 px-4 py-1.5 text-sm font-medium text-black hover:bg-green-500"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Log in
                            </button>

                            {/* Register link */}
                            <div className="pt-4 text-center text-xs text-gray-400">
                                Don’t have an account?{' '}
                                <Link href={route('register')} className="text-green-300 underline">
                                    Register
                                </Link>
                            </div>
                        </>
                    )}
                </Form>

                {/* Status message */}
                {status && <div className="mt-4 text-center text-sm font-medium text-green-500">{status}</div>}
            </div>
        </div>
    );
}
