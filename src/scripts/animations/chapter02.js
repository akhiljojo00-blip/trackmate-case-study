export function initChapter02Animations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#chapter-02",
      start: "top 60%",
      toggleActions: "play none none reverse"
    }
  });

  // 1. Reveal Header
  tl.fromTo(".ch2-header", 
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  );

  // 2. Explode layers across the Z-axis to show structural isolation
  tl.fromTo(".layer-location",
    { opacity: 0, z: 0 },
    { opacity: 1, z: -100, duration: 1.2, ease: "back.out(1.2)" },
    "-=0.5"
  );

  tl.fromTo(".layer-gate",
    { opacity: 0, z: 0 },
    { opacity: 1, z: 0, duration: 1.2, ease: "back.out(1.2)" },
    "-=1"
  );

  tl.fromTo(".layer-social",
    { opacity: 0, z: 0 },
    { opacity: 1, z: 100, duration: 1.2, ease: "back.out(1.2)" },
    "-=1"
  );

  // Add subtle continuous floating to the extreme layers
  gsap.to(".layer-social", {
    z: 110,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".layer-location", {
    z: -110,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1 // offset the float
  });
}
