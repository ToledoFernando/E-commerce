const call = (view, port) => {
  if (view[0].isIntersecting) {
    // console.log(view[0].target.classList)
    return view[0].target.classList = view[0].target.classList[0];
  }
};

const observer = new IntersectionObserver(call, {
  root: null,
  rootMargin: '0px',
  threshold: 0
});

export const newObserver = (res) => {
  return observer.observe(res)
}