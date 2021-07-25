export const isMobile = (): boolean => {
    const whatUser = navigator.userAgent;
    if (
        whatUser.match(/Android/i) ||
        whatUser.match(/Iphone/i) ||
        whatUser.match(/webOS/i) ||
        whatUser.match(/Ipad/i) ||
        whatUser.match(/Ipod/i) ||
        whatUser.match(/BlackBerry/i) ||
        whatUser.match(/Windows Phone/i)
    ) {
        return true;
    } else {
        return false;
    }
}