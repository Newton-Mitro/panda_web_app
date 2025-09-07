import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className="content">
                        <div className="terminal glass w-full max-w-md rounded-lg p-6 shadow-2xl">
                            <div className="mb-4 text-sm text-green-300">
                                <div className="font-medium">
                                    Login to <span className="text-white">PandaWebApp</span>
                                </div>
                                <div className="mt-1 text-xs text-gray-400">Please authenticate to continue</div>
                            </div>

                            <form action="/login" method="POST" className="space-y-4" autoComplete="on">
                                <div className="flex items-center gap-3 rounded border border-green-900/30 bg-transparent px-3 py-2">
                                    <span className="text-sm text-green-400 select-none">username:</span>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-green-200/30"
                                    />
                                </div>

                                <div className="flex items-center gap-3 rounded border border-green-900/30 bg-transparent px-3 py-2">
                                    <span className="text-sm text-green-400 select-none">password:</span>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-green-200/30"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-xs text-green-200/70">
                                        <input type="checkbox" name="remember" className="h-4 w-4 accent-green-400" />
                                        Remember me
                                    </label>

                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded bg-green-500/90 px-4 py-1.5 text-sm font-medium text-black hover:bg-green-500"
                                    >
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        Login
                                    </button>
                                </div>

                                <div className="pt-2 text-xs text-gray-400">
                                    Press <span className="font-semibold text-white">Enter</span> to submit — or{' '}
                                    <a href="#" className="text-green-300 underline">
                                        forgot password
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
