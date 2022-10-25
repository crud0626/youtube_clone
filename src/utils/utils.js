export function handleThumbnailError(target, imgPath) {
    target.onerror = null;
    target.src = imgPath;
}

export function handleToggle(target, toggle) {
    if (target.matches(".expander")) {
        target.classList.remove("expander");
        toggle.innerText = "더보기";
        return;
    }

    target.classList.add("expander");
    toggle.innerText = "간략히";
    return;
}