import { setupMarqueeAnimation } from "./marquee.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const lenis = new Lenis();
  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const cards = gsap.utils.toArray(".card");

  const introCard = cards[0];

  const titles = gsap.utils.toArray(".card-title h1");
  titles.forEach((title, i) => {
    const split = new SplitText(title, {
      type: "chars",
      charsClass: "char",
      tag: "div",
    });
    split.chars.forEach((char, index) => {
      char.innerHTML = `<span>${char.textContent}</span>`;
    });
  });

  const cardImageWrapper = introCard.querySelector(".card-image");
  const cardImage = introCard.querySelector(".card-image img");

  gsap.set(cardImageWrapper, { scale: 0.5, borderRadius: "400px" });
  gsap.set(cardImage, { scale: 1.5 });

  function animationContentIn(titleChars, description) {
    gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
    gsap.to(description, {
      x: 0,
      opacity: 1,
      duraation: 0.75,
      ease: "power4.out",
      delay: 0.1,
    });
  }

  function animationContentOut(titleChars, description) {
    gsap.to(titleChars, { x: "100%", duration: 0.75, ease: "power4.out" });
    gsap.to(description, {
      x: "40px",
      opacity: 0,
      duraation: 0.75,
      ease: "power4.out",
      delay: 0.1,
    });
  }

  const marquee = introCard.querySelector(".card-marquee .marquee");
  const titleChars = introCard.querySelectorAll(".char span");
  const description = introCard.querySelector(".card-description ");

  ScrollTrigger.create({
    trigger: introCard,
    start: "top top",
    end: "+=300vh",

    onUpdate: (self) => {
      const progress = self.progress;
      const imgScale = 0.5 + progress * 0.5;
      const borderRadius = 400 - progress * 375;
      const innerImageScale = 1.5 - progress * 0.5;

      gsap.set(cardImageWrapper, {
        scale: imgScale,
        borderRadius: `${borderRadius}px`,
      });
      gsap.set(cardImage, {
        scale: innerImageScale,
      });

      if (imgScale >= 0.5 && imgScale < 0.75) {
        const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
        gsap.set(marquee, { opacity: 1 - fadeProgress });
      } else if (imgScale < 0.5) {
        gsap.set(marquee, { opacity: 1 });
      } else {
        gsap.set(marquee, { opacity: 0 });
      }

      if (progress >= 1 && !introCard.contentRevealed) {
        introCard.contentRevealed = true;
        animationContentIn(titleChars, description);
      }
      if (progress < 1 && introCard.contentRevealed) {
        introCard.contentRevealed = false;
        animationContentOut(titleChars, description);
      }
    },
  });

  cards.forEach((card, index) => {
    const isLastCard = index === cards.length - 1;

    ScrollTrigger.create({
      trigger: card,
      start: "top top",
      end: isLastCard ? "+=100vh" : "top top",
      endTrigger: isLastCard ? null : cards[cards.length - 1],
      pin: true,
      pinSpacing: isLastCard,
    });
  });

  cards.forEach((card, index) => {
    if (index < cards.length - 1) {
      const cardWrapper = card.querySelector(".card-wrapper");
      ScrollTrigger.create({
        trigger: cards[index + 1],
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cardWrapper, {
            scale: 1 - 0.25 * progress,
            opacity: 1 - progress,
          });
        },
      });
    }
  });

  cards.forEach((card, index) => {
    const cardImg = card.querySelector(".card-image img");
    const imageContainer = card.querySelector(".card-image");

    ScrollTrigger.create({
      trigger: card,
      start: "top bottom",
      end: "top top",
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.set(cardImg, {
          scale: 2 - progress,
        });
        gsap.set(imageContainer, {
          borderRadius: 150 - progress * 125 + "px",
        });
      },
    });
  });

  cards.forEach((card, index) => {
    if (index === 0) {
      return;
    }
    const cardDescription = card.querySelector(".card-description");
    const titleChars = card.querySelectorAll(".char span");
    ScrollTrigger.create({
      trigger: card,
      start: "top top",
      onEnter: () => animationContentIn(titleChars, cardDescription),
      onLeaveBack: () => animationContentOut(titleChars, cardDescription),
    });
  });
  setupMarqueeAnimation();
});
