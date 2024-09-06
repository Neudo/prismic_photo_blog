export const breakPointsChecker = (width: number) => {
    let isMobile = false;
    let isTablet = false;
    let isDesktop = false;

    if (width < 768) {
        isMobile = true;
    }
    if (width >= 768 && width < 1024) {
        isTablet = true;
    }
    if (width >= 1024) {
        isDesktop = true;
    }
    return {isMobile, isTablet, isDesktop};
}

