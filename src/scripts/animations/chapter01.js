export function initChapter01Animations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Create a timeline linked to the scroll position of Chapter 01
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#chapter-01",
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });

  // 1. Reveal Section Header
  tl.fromTo(".ch1-header", 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  );

  // 2. Animate the central divider growing downwards (desktop only)
  tl.to(".ch1-divider", {
    scaleY: 1,
    duration: 1,
    ease: "power3.inOut"
  }, "-=0.5"); // Start slightly before the header finishes

  // 3. Stagger in the two cards
  tl.to(".trad-card", {
    opacity: 1,
    y: 0, // Overrides the tailwind translate-y-12 class
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6");

  tl.to(".tm-card", {
    opacity: 1,
    y: 0, // Overrides the tailwind translate-y-12 class
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.4");
}
