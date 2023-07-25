function useScrollToTop() {
  const scrollToTop = (options) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      ...options,
    });
  };

  return scrollToTop;
}

export default useScrollToTop;