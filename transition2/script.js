document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const href = link.getAttribute("href");

      if (href && href !== "#" && href !== window.location.pathname) {
        animateTransition().then(() => {
          window.location.href = href;
        });
      }
    });
  });

  gsap.set(".block", {
    visibility: "visible",
    scaleY: 1,
  });

  revealTransition().then(() => {
    gsap.set(".block", {
      visibility: "hidden",
    });
  });

  function revealTransition() {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: resolve,
      });

      tl.fromTo(
        ".row-1 .block",
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 1,
          delay: 0.2,
          stagger: {
            each: 0.1,
            from: "start",
            grid: [1, 5],
            axis: "x",
          },
          ease: "power4.inOut",
        },
        0
      );

      tl.fromTo(
        ".row-2 .block",
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 1,
          delay: 0.2,
          stagger: {
            each: 0.1,
            from: "start",
            grid: [1, 5],
            axis: "x",
          },
          ease: "power4.inOut",
        },
        0
      );
    });
  }

  function animateTransition() {
    return new Promise((resolve) => {
      gsap.set(".block", {
        visibility: "visible",
        scaleY: 0,
      });
      const tl = gsap.timeline({
        onComplete: resolve,
      });
      tl.fromTo(
        ".row-1 .block",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          delay: 0.2,
          stagger: {
            each: 0.1,
            from: "start",
            grid: [1, 5],
            axis: "x",
          },
          ease: "power4.inOut",
        },
        0
      );
      tl.fromTo(
        ".row-2 .block",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          delay: 0.2,
          stagger: {
            each: 0.1,
            from: "start",
            grid: [1, 5],
            axis: "x",
          },
          ease: "power4.inOut",
        },
        0
      );
    });
  }
});
