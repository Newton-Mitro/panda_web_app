function ImageCardItem({ image, title, subtitle, text, key }) {
    return (
        <div key={key} className="flex items-center gap-6 bg-card px-4 py-2">
            <img src={image} alt={title || `img-${key}`} className="h-16 w-16 flex-shrink-0 object-cover" />
            <div className="">
                {title && <p className="font-semibold">{title}</p>}
                {subtitle && <p className="text-[var(--muted-foreground)]">{subtitle}</p>}
                {text && <p className="text-[var(--muted-foreground)]">{text.substring(0, 80)}</p>}
            </div>
        </div>
    );
}

export default ImageCardItem;
