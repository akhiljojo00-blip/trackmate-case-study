export function initChapter03Animations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#chapter-03",
      start: "top 70%",
      toggleActions: "play none none reverse"
    }
  });

  // Reveal Header
  tl.fromTo(".ch3-header", 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  );

  // Stagger in the Bento Grid Items
  tl.to(".bento-item", {
    opacity: 1,
    y: 0, // Overrides the translate-y-12 class
    duration: 0.8,
    stagger: 0.2, // Stagger each bento cell by 0.2s
    ease: "power3.out"
  }, "-=0.5");
}
