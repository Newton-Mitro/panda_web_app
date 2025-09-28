function ImageCardItem({ image, title, subtitle, text, key }) {
    return (
        <div key={key} className="max-w-sm overflow-hidden rounded-2xl bg-card shadow transition duration-500 hover:scale-[1.02] hover:shadow-2xl">
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
                <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
                {subtitle && <p className="mt-1 text-sm font-medium text-muted-foreground">{subtitle}</p>}
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
        </div>
    );
}

export default ImageCardItem;
