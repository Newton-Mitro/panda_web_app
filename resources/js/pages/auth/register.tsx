import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function Register() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#07111a] font-mono">
            <Head title="Register" />

            <div className="w-full max-w-md rounded-lg border border-white/5 bg-gradient-to-b from-[#061018] to-[#07121a] p-6 shadow-2xl">
                {/* Terminal Header / Logo */}
                <div className="mb-4 flex justify-center">
                    <AppLogoIcon className="h-24 w-24 fill-current text-white" />
                </div>

                {/* Intro */}
                <div className="mb-6 text-center text-sm text-green-300">
                    <div className="font-medium">
                        Create your <span className="text-white">PandaWeb</span> account
                    </div>
                    <div className="text-xs text-gray-400">Enter your details below</div>
                </div>

                {/* Form */}
                <Form
                    method="post"
                    action={route('register')}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* Name */}
                            <div>
                                <label className="mb-1 block text-xs text-green-200/80">name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    autoFocus
                                    autoComplete="name"
                                    placeholder="Full name"
                                    className="w-full rounded border border-green-900/30 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-green-200/30"
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-1 block text-xs text-green-200/80">email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
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
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="w-full rounded border border-green-900/30 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-green-200/30"
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="mb-1 block text-xs text-green-200/80">confirm password</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    required
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="w-full rounded border border-green-900/30 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-green-200/30"
                                />
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded bg-green-500/90 px-4 py-1.5 text-sm font-medium text-black hover:bg-green-500"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create account
                            </button>

                            {/* Already have account */}
                            <div className="pt-4 text-center text-xs text-gray-400">
                                Already have an account?{' '}
                                <Link href={route('login')} className="text-green-300 underline">
                                    Log in
                                </Link>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
