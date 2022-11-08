export function handleThumbnailError(target, imgPath) {
    target.onerror = null;
    target.src = imgPath;
}