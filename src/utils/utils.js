export function handleThumbnailError(target, imgPath) {
    target.onerror = null;
    target.src = imgPath;
}

export function convertIdToUrl(id) {
    return `https://www.youtube.com/channel/${id}`;
}