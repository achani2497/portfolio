// export const applyFadeInEffect = (selector: string) => {
//   if (typeof window === "undefined") {
//     return;
//   }
//   const cards = document.querySelectorAll<HTMLElement>(selector);

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry, index) => {
//         if (entry.isIntersecting) {
//           const target = entry.target as HTMLElement;
//           target.style.transitionDelay = `${index * 0.2}s`;

//           target.classList.remove("opacity-0", "translate-y-4");
//         }
//       });
//     },
//     { threshold: 0.25 },
//   );

//   cards.forEach((card) => observer.observe(card));
// };
export const applyFadeInEffect = (selector: string) => {
  if (typeof window === "undefined") return;

  const cards = document.querySelectorAll<HTMLElement>(selector);

  const offset = Math.round(window.innerHeight * 0.1);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.transitionDelay = `${index * 0.2}s`;
          target.classList.remove("opacity-0", "translate-y-4");
        }
      });
    },
    { rootMargin: `0px 0px -${offset}px 0px` }, // negativo = "entrá más antes de disparar"
  );

  cards.forEach((card) => observer.observe(card));
};
