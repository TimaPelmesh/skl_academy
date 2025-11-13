// Mobile menu toggle с анимацией
document.getElementById('mobile-menu-button').addEventListener('click', function() {
  const menu = document.getElementById('mobile-menu');
  const burgerIcon = this.querySelector('.burger-icon');
  
  // Переключаем активные классы для меню и иконки
  menu.classList.toggle('is-active');
  burgerIcon.classList.toggle('is-active');
  
  // Добавляем/удаляем класс hidden для совместимости
  if (menu.classList.contains('is-active')) {
    menu.classList.remove('hidden');
  } else {
    // Добавляем класс hidden после завершения анимации
    setTimeout(() => {
      menu.classList.add('hidden');
    }, 300);
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
// Global contact fab auto-inject for all pages (courses, articles, homepage)
(function globalContactFab() {
  function ensureContact() {
    const path = (window.location && window.location.pathname) || '';
    // Показываем только на страницах курсов и статей
    const allowed = /\/(courses|articles)\//.test(path);
    if (!allowed) return;
    let fab = document.getElementById('contactFab');
    let card = document.getElementById('contactCard');
    const frag = document.createDocumentFragment();
    if (!fab) {
      fab = document.createElement('a');
      fab.href = '#';
      fab.id = 'contactFab';
      fab.className = 'contact-fab';
      fab.title = 'Есть вопросы?';
      fab.setAttribute('aria-label', 'Открыть контакты');
      fab.textContent = 'i';
      frag.appendChild(fab);
    }
    if (!card) {
      card = document.createElement('div');
      card.id = 'contactCard';
      card.className = 'contact-card';
      card.setAttribute('aria-live', 'polite');
      card.setAttribute('aria-hidden', 'true');
      card.innerHTML = '<h4>Есть вопросы — пиши:</h4>' +
        '<div class="contact-links">' +
        '<a href="https://t.me/tima_pelmeshka" target="_blank" rel="noopener">Telegram</a>' +
        '<a href="mailto:mr.tim.pumpkin@gmail.com">mr.tim.pumpkin@gmail.com</a>' +
        '</div>';
      frag.appendChild(card);
    }
    if (frag.childNodes.length) document.body.appendChild(frag);

    if (!fab || !card) return;
    function toggle(force) {
      const willOpen = typeof force === 'boolean' ? force : !card.classList.contains('active');
      card.classList.toggle('active', willOpen);
      card.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
      fab.textContent = willOpen ? '×' : 'i';
      fab.setAttribute('aria-label', willOpen ? 'Закрыть контакты' : 'Открыть контакты');
      fab.setAttribute('title', willOpen ? 'Закрыть' : 'Есть вопросы?');
    }
    fab.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggle(); });
    document.addEventListener('click', (e) => {
      if (!card.classList.contains('active')) return;
      const el = e.target;
      if (el === card || el === fab || card.contains(el)) return;
      toggle(false);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureContact, { once: true });
  } else {
    ensureContact();
  }
})();

// Parallax effect for hero section removed to keep hero static

// WebGL hero scene (Three.js)
(function initHeroWebGL() {
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;
  if (typeof THREE === 'undefined') return;

  const container = document.getElementById('hero-webgl');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030712, 0.045);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 190);
  camera.position.set(0, 0, 18.5);
  scene.add(camera);

  const coreGroup = new THREE.Group();
  coreGroup.position.x = -1.2;
  scene.add(coreGroup);

  const wireCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(4.8, 3),
    new THREE.MeshBasicMaterial({
      color: 0x647cff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    })
  );
  coreGroup.add(wireCore);

  const glowSphere = new THREE.Mesh(
    new THREE.SphereGeometry(4.4, 64, 64),
    new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
      blending: THREE.AdditiveBlending
    })
  );
  coreGroup.add(glowSphere);

  const accentRing = new THREE.Mesh(
    new THREE.TorusGeometry(6.4, 0.14, 86, 380),
    new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending
    })
  );
  accentRing.rotation.set(Math.PI / 2.3, 0, Math.PI / 4);
  coreGroup.add(accentRing);

  const starGroup = new THREE.Group();
  starGroup.position.x = -1.35;
  scene.add(starGroup);

  const layers = [];
  const layerConfigs = [
    { count: 1600, radius: 32, size: 0.11, color: 0xbad4ff, speed: 0.006, twinkle: 0.8 },
    { count: 1400, radius: 25, size: 0.15, color: 0x8ea2ff, speed: -0.01, twinkle: 0.6 },
    { count: 1000, radius: 18, size: 0.19, color: 0x7dd3fc, speed: 0.014, twinkle: 1 }
  ];

  function randomPointOnSphere(maxRadius) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const radius = maxRadius * Math.pow(Math.random(), 0.45);
    const sinPhi = Math.sin(phi);
    return new THREE.Vector3(
      radius * sinPhi * Math.cos(theta),
      radius * sinPhi * Math.sin(theta),
      radius * Math.cos(phi)
    );
  }

  layerConfigs.forEach((cfg, index) => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(cfg.count * 3);
    const offsets = new Float32Array(cfg.count);

    for (let i = 0; i < cfg.count; i++) {
      const point = randomPointOnSphere(cfg.radius);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('offset', new THREE.BufferAttribute(offsets, 1));
    const basePositions = positions.slice();

    const material = new THREE.PointsMaterial({
      size: cfg.size,
      color: cfg.color,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const points = new THREE.Points(geometry, material);
    points.userData = {
      rotationSpeed: cfg.speed,
      twinkleIntensity: cfg.twinkle,
      twinkleBase: 0.2 + 0.18 * index,
      twinkleOffset: Math.random() * Math.PI * 2,
      basePositions
    };

    starGroup.add(points);
    layers.push(points);
  });

  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
  } else {
    window.addEventListener('resize', handleResize);
  }

  function handleResize() {
    const { width, height } = container.getBoundingClientRect();
    const clampedWidth = Math.max(width, 320);
    const clampedHeight = Math.max(height, 240);
    renderer.setSize(clampedWidth, clampedHeight, false);
    camera.aspect = clampedWidth / clampedHeight;
    camera.updateProjectionMatrix();
  }

  handleResize();

  const clock = new THREE.Clock();

  function animate() {
    const elapsed = clock.getElapsedTime();

    coreGroup.rotation.y = elapsed * 0.12;
    coreGroup.rotation.x = Math.sin(elapsed * 0.18) * 0.18;
    accentRing.rotation.z = elapsed * 0.22;

    layers.forEach((points, idx) => {
      points.rotation.y += points.userData.rotationSpeed;
      points.rotation.x += points.userData.rotationSpeed * 0.25;
      const geometry = points.geometry;
      const offsets = geometry.attributes.offset;
      const positions = geometry.attributes.position;
      const basePositions = points.userData.basePositions;
      const mat = points.material;
      const base = points.userData.twinkleBase;
      const intensity = points.userData.twinkleIntensity;
      const globalPhase = elapsed * (0.8 + idx * 0.35) + points.userData.twinkleOffset;

      mat.opacity = THREE.MathUtils.clamp(base + Math.sin(globalPhase) * 0.35 * intensity, 0.12, 0.85);
      mat.size = (layerConfigs[idx].size || 0.1) * (1 + 0.24 * Math.sin(elapsed * (1 + idx * 0.3)));

      for (let i = 0; i < offsets.count; i++) {
        const offset = offsets.array[i];
        const wiggle = Math.sin(globalPhase + offset) * 0.32 * 0.01 * (idx + 1);
        const sway = Math.cos(globalPhase * 0.6 + offset * 1.4) * 0.26 * 0.01 * (idx + 1.3);
        positions.array[i * 3] = basePositions[i * 3] + sway;
        positions.array[i * 3 + 1] = basePositions[i * 3 + 1] + wiggle;
        positions.array[i * 3 + 2] = basePositions[i * 3 + 2];
      }
      positions.needsUpdate = true;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
})();