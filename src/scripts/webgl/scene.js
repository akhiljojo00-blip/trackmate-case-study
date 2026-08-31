export function initWebGLScene() {
  const container = document.getElementById('webgl-container');
  if (!container) return;

  // 1. Scene Setup
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15; 

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // 2. The Midnight Globe
  // Detail level 2 Icosahedron
  const globeGeometry = new THREE.IcosahedronGeometry(6, 2);
  const globeMaterial = new THREE.MeshStandardMaterial({
    color: 0x0F1B2B, // Midnight Glass
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);

  // Add ambient light for standard material
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // 3. The Solar Gold Pin
  const pinGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const pinMaterial = new THREE.MeshBasicMaterial({ color: 0xFFB300 }); // Solar Gold
  const pin = new THREE.Mesh(pinGeometry, pinMaterial);
  
  // Position it on the surface of the globe
  const pinPosition = new THREE.Vector3(3, 4, 3.12);
  pinPosition.setLength(6); // exactly on surface
  pin.position.copy(pinPosition);
  
  // Group them so they rotate together
  const globeGroup = new THREE.Group();
  globeGroup.add(globe);
  globeGroup.add(pin);
  scene.add(globeGroup);

  // Add PointLight at pin
  const pinLight = new THREE.PointLight(0xFFD54F, 2, 50);
  pinLight.position.copy(pinPosition);
  globeGroup.add(pinLight);

  // 4. Telemetry Particles (The Void)
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 1500;
  const posArray = new Float32Array(particleCount * 3);
  
  for(let i=0; i < particleCount * 3; i++) {
    // Random positions roughly between -25 and 25
    posArray[i] = (Math.random() - 0.5) * 50;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x64B5F6, // Light Sapphire
    transparent: true,
    opacity: 0.6
  });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // 5. Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Slow idle rotation
    globeGroup.rotation.y += 0.0015;
    globeGroup.rotation.x += 0.0005;
    
    particlesMesh.rotation.y -= 0.0003;

    renderer.render(scene, camera);
  }
  
  animate();

  // 6. GSAP Scroll Interaction
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // We add ScrollTrigger just to allow scrolling to modify rotation slightly faster
    // but the smooth-wrapper might not have enough height yet (only chapter 00 exists)
    // For now, hook it up anyway so when content grows, it works.
    gsap.to(globeGroup.rotation, {
      y: "+=3.14", // Rotate extra half turn based on scroll
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });

    gsap.to(camera.position, {
      z: 10,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });
  }
}
