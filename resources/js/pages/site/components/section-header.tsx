function SectionHeader({ heading, sub_heading }) {
    return (
        <div className="mb-6 flex flex-col items-center justify-center text-center">
            {heading && <h2 className="mb-1 text-3xl font-semibold">{heading}</h2>}
            {sub_heading && <h3 className="mb-2 text-sm text-gray-500">{sub_heading}</h3>}
            <div className="mx-auto mb-8 h-1 w-16 bg-foreground md:mx-0"></div>
        </div>
    );
}

export default SectionHeader;
