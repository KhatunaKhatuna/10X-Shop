/**
 * Scrolls the browser window to the top.
 * @param smooth - If true, performs a smooth animated scroll. Otherwise, jumps instantly.
 */
export const scrollToTop = (smooth = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto",
  });
};

