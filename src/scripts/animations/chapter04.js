export function initChapter04Animations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#chapter-04",
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });

  // Reveal the container card
  tl.to(".ch4-container", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Animate the counter for Automated Tests
  const counterElement = document.querySelector('.metric-counter');
  if (counterElement) {
    const targetValue = parseInt(counterElement.getAttribute('data-target'), 10) || 141;

    // Use GSAP to animate a dummy object and update the text content on progress
    tl.to({ val: 0 }, {
      val: targetValue,
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        // this.targets()[0].val holds the current animated value
        counterElement.innerText = Math.floor(this.targets()[0].val);
      }
    }, "-=0.5"); // Start slightly before the container finishes sliding up
  }

  // Footer fade-in (Optional but nice)
  gsap.fromTo("#chapter-05", 
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#chapter-05",
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    }
  );
}
