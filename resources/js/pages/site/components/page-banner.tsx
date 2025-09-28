function PageBanner({ title, subtitle = 'We’d love to hear from you—reach out for support, partnerships, or just to say hi!' }) {
    return (
        <section className="mt-16 bg-secondary py-20 text-secondary-foreground">
            <div className="mx-auto max-w-4xl px-4 text-center">
                <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
                <p className="text-lg opacity-90 md:text-xl">{subtitle}</p>
            </div>
        </section>
    );
}

export default PageBanner;
