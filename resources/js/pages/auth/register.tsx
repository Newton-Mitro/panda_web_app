import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function Register() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6 font-sans text-foreground">
            <Head title="Register" />

            <div className="w-full max-w-md rounded-lg border border-border bg-card p-6">
                {/* Terminal Header / Logo */}
                <div className="mb-4 flex justify-center">
                    <AppLogoIcon className="h-24 w-24 text-primary" />
                </div>

                {/* Intro */}
                <div className="mb-6 text-center text-sm text-primary">
                    <div className="font-medium">
                        Create your <span className="text-foreground">SmartPanda</span> account
                    </div>
                    <div className="text-xs text-muted-foreground">Enter your details below</div>
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
                                <label className="mb-1 block text-xs text-muted-foreground">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    autoFocus
                                    autoComplete="name"
                                    placeholder="Full name"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-1 block text-xs text-muted-foreground">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-1 block text-xs text-muted-foreground">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="mb-1 block text-xs text-muted-foreground">Confirm Password</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    required
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                                />
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create account
                            </button>

                            {/* Already have account */}
                            <div className="pt-4 text-center text-xs text-muted-foreground">
                                Already have an account?{' '}
                                <Link href={route('login')} className="text-primary underline">
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
