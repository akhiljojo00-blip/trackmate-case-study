export function initIntroSequence() {
  const introContent = document.querySelector('.intro-content');
  const skipBtn = document.getElementById('btn-skip-intro');

  if (!introContent) return;

  // Basic fade-in sequence using GSAP
  // Set initial state via CSS opacity: 0 on the DOM
  gsap.to(introContent, {
    opacity: 1,
    duration: 2,
    ease: "power2.inOut",
    delay: 0.5
  });

  // Handle skip intro button
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      // In a full build, this would scroll to Chapter 01 or fast-forward timelines
      console.log('Skipping intro...');
      gsap.to(window, {
        duration: 1,
        scrollTo: "#next-chapter-placeholder" // Placeholder for future scroll logic
      });
    });
  }
}
