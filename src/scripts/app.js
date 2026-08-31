import { initIntroSequence } from './animations/intro.js';
import { initChapter01Animations } from './animations/chapter01.js';
import { initChapter02Animations } from './animations/chapter02.js';
import { initChapter03Animations } from './animations/chapter03.js';
import { initChapter04Animations } from './animations/chapter04.js';
import { initWebGLScene } from './webgl/scene.js';

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins globally
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize WebGL Scene
  initWebGLScene();

  // Initialize Chapter 00 animations
  initIntroSequence();

  // Initialize Chapter 01 animations
  initChapter01Animations();

  // Initialize Chapter 02 animations
  initChapter02Animations();

  // Initialize Chapter 03 animations
  initChapter03Animations();

  // Initialize Chapter 04 & Footer animations
  initChapter04Animations();
});
