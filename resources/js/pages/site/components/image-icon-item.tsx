function ImageIconItem({ img_icon, title, subtitle, key }) {
    return (
        <div key={key} className="flex items-center gap-6">
            <img src={img_icon} alt={title || `img-${key}`} className="h-8 w-8 flex-shrink-0 object-cover" />
            <div className="">
                {title && <p className="font-semibold">{title}</p>}
                {subtitle && <p className="text-[var(--muted-foreground)]">{subtitle.substring(0, 80)}</p>}
            </div>
        </div>
    );
}

export default ImageIconItem;
