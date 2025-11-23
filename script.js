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

// WebGL hero scene (Three.js) - Интерактивная 3D сцена
(function initHeroWebGL() {
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;
  if (typeof THREE === 'undefined') return;

  const container = document.getElementById('hero-webgl');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030712, 0.035);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  camera.position.set(0, 0, 20);
  scene.add(camera);

  // Центральная группа объектов
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Создаем сеть частиц (нейронная сеть)
  const particleCount = 120;
  const particles = [];
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);

  const colors = [
    new THREE.Color(0x647cff), // синий
    new THREE.Color(0x818cf8), // фиолетовый
    new THREE.Color(0x38bdf8), // голубой
    new THREE.Color(0xa78bfa), // лавандовый
    new THREE.Color(0x60a5fa)  // светлый синий
  ];

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 8 + Math.random() * 6;
    const height = (Math.random() - 0.5) * 12;
    
    particlePositions[i * 3] = Math.cos(angle) * radius;
    particlePositions[i * 3 + 1] = height;
    particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

    const color = colors[Math.floor(Math.random() * colors.length)];
    particleColors[i * 3] = color.r;
    particleColors[i * 3 + 1] = color.g;
    particleColors[i * 3 + 2] = color.b;

    particleSizes[i] = 0.3 + Math.random() * 0.4;

    particles.push({
      baseX: particlePositions[i * 3],
      baseY: particlePositions[i * 3 + 1],
      baseZ: particlePositions[i * 3 + 2],
      offset: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4
    });
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.4,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  mainGroup.add(particleSystem);

  // Создаем линии между частицами
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = [];
  const lineColors = [];
  const maxDistance = 5;
  const connections = [];

  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dx = particlePositions[i * 3] - particlePositions[j * 3];
      const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
      const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance < maxDistance) {
        linePositions.push(
          particlePositions[i * 3],
          particlePositions[i * 3 + 1],
          particlePositions[i * 3 + 2],
          particlePositions[j * 3],
          particlePositions[j * 3 + 1],
          particlePositions[j * 3 + 2]
        );

        const opacity = 1 - (distance / maxDistance);
        const color1 = new THREE.Color(particleColors[i * 3], particleColors[i * 3 + 1], particleColors[i * 3 + 2]);
        const color2 = new THREE.Color(particleColors[j * 3], particleColors[j * 3 + 1], particleColors[j * 3 + 2]);

        lineColors.push(color1.r, color1.g, color1.b, opacity * 0.3);
        lineColors.push(color2.r, color2.g, color2.b, opacity * 0.3);

        connections.push({ i, j, distance, opacity });
      }
    }
  }

  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    linewidth: 1
  });

  const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
  mainGroup.add(lineSystem);

  // Плавающие геометрические формы
  const shapes = [];
  const shapeConfigs = [
    { type: 'tetrahedron', size: 1.2, color: 0x647cff, speed: 0.8 },
    { type: 'octahedron', size: 1.0, color: 0x818cf8, speed: 0.6 },
    { type: 'icosahedron', size: 0.9, color: 0x38bdf8, speed: 0.7 },
    { type: 'tetrahedron', size: 1.1, color: 0xa78bfa, speed: 0.9 },
    { type: 'octahedron', size: 0.95, color: 0x60a5fa, speed: 0.75 }
  ];

  shapeConfigs.forEach((config, index) => {
    let geometry;
    switch (config.type) {
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(config.size, 0);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(config.size, 0);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(config.size, 0);
        break;
    }

    const material = new THREE.MeshBasicMaterial({
      color: config.color,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(geometry, material);
    const angle = (index / shapeConfigs.length) * Math.PI * 2;
    const radius = 10 + Math.random() * 4;
    mesh.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 8,
      Math.sin(angle) * radius
    );
    mesh.userData = {
      basePosition: mesh.position.clone(),
      rotationSpeed: config.speed * 0.01,
      floatSpeed: 0.3 + Math.random() * 0.3,
      floatOffset: Math.random() * Math.PI * 2
    };
    mainGroup.add(mesh);
    shapes.push(mesh);
  });

  // ========== ЭНЕРГЕТИЧЕСКИЙ РЕАКТОР ==========
  const reactorGroup = new THREE.Group();
  mainGroup.add(reactorGroup);

  // Внутреннее ядро - пульсирующая сфера
  const innerCoreGeometry = new THREE.IcosahedronGeometry(1.2, 3);
  const innerCoreMaterial = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    wireframe: false,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const innerCore = new THREE.Mesh(innerCoreGeometry, innerCoreMaterial);
  reactorGroup.add(innerCore);

  // Средний слой - вращающийся октаэдр
  const midCoreGeometry = new THREE.OctahedronGeometry(1.8, 1);
  const midCoreMaterial = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });
  const midCore = new THREE.Mesh(midCoreGeometry, midCoreMaterial);
  reactorGroup.add(midCore);

  // Внешний слой - тетраэдр
  const outerCoreGeometry = new THREE.TetrahedronGeometry(2.4, 0);
  const outerCoreMaterial = new THREE.MeshBasicMaterial({
    color: 0x647cff,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  });
  const outerCore = new THREE.Mesh(outerCoreGeometry, outerCoreMaterial);
  reactorGroup.add(outerCore);

  // Вращающиеся кольца энергии (орбитальные кольца)
  const energyRings = [];
  const ringConfigs = [
    { radius: 3.2, thickness: 0.12, color: 0x60a5fa, axis: 'x', speed: 0.8 },
    { radius: 3.5, thickness: 0.1, color: 0x818cf8, axis: 'y', speed: -0.6 },
    { radius: 3.8, thickness: 0.08, color: 0xa78bfa, axis: 'z', speed: 0.7 },
    { radius: 4.2, thickness: 0.1, color: 0x38bdf8, axis: 'x', speed: -0.5, tilt: Math.PI / 3 },
    { radius: 4.6, thickness: 0.09, color: 0x647cff, axis: 'y', speed: 0.9, tilt: Math.PI / 4 }
  ];

  ringConfigs.forEach((config, i) => {
    const ringGeometry = new THREE.TorusGeometry(config.radius, config.thickness, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    
    // Устанавливаем ориентацию кольца
    if (config.axis === 'x') {
      ring.rotation.y = Math.PI / 2;
      if (config.tilt) ring.rotation.z = config.tilt;
    } else if (config.axis === 'y') {
      ring.rotation.x = Math.PI / 2;
      if (config.tilt) ring.rotation.z = config.tilt;
    } else if (config.axis === 'z') {
      if (config.tilt) ring.rotation.x = config.tilt;
    }
    
    ring.userData = {
      rotationSpeed: config.speed * 0.01,
      axis: config.axis,
      baseRotation: ring.rotation.clone()
    };
    reactorGroup.add(ring);
    energyRings.push(ring);
  });

  // Светящиеся лучи, выходящие из центра
  const rayCount = 12;
  const rays = [];
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2;
    const rayGeometry = new THREE.CylinderGeometry(0.05, 0.15, 5, 8);
    const rayMaterial = new THREE.MeshBasicMaterial({
      color: colors[i % colors.length],
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const ray = new THREE.Mesh(rayGeometry, rayMaterial);
    
    // Позиционируем лучи радиально
    ray.position.x = Math.cos(angle) * 2.5;
    ray.position.y = Math.sin(angle * 0.7) * 2.5;
    ray.position.z = Math.sin(angle) * 2.5;
    
    // Направляем лучи от центра
    ray.lookAt(0, 0, 0);
    ray.rotateX(Math.PI / 2);
    
    ray.userData = {
      baseAngle: angle,
      basePosition: ray.position.clone(),
      pulseOffset: Math.random() * Math.PI * 2
    };
    reactorGroup.add(ray);
    rays.push(ray);
  }

  // Частицы энергии, вылетающие из реактора
  const energyParticles = [];
  const energyParticleCount = 40;
  const energyParticleGeometry = new THREE.BufferGeometry();
  const energyParticlePositions = new Float32Array(energyParticleCount * 3);
  const energyParticleSizes = new Float32Array(energyParticleCount);

  for (let i = 0; i < energyParticleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 2.5 + Math.random() * 3;
    
    energyParticlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(angle);
    energyParticlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(angle);
    energyParticlePositions[i * 3 + 2] = radius * Math.cos(phi);
    
    energyParticleSizes[i] = 0.2 + Math.random() * 0.3;
    
    energyParticles.push({
      baseRadius: radius,
      angle: angle,
      phi: phi,
      speed: 0.5 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2
    });
  }

  energyParticleGeometry.setAttribute('position', new THREE.BufferAttribute(energyParticlePositions, 3));
  energyParticleGeometry.setAttribute('size', new THREE.BufferAttribute(energyParticleSizes, 1));

  const energyParticleMaterial = new THREE.PointsMaterial({
    size: 0.3,
    color: 0x60a5fa,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false
  });

  const energyParticleSystem = new THREE.Points(energyParticleGeometry, energyParticleMaterial);
  reactorGroup.add(energyParticleSystem);

  // Внешнее свечение реактора
  const reactorGlowGeometry = new THREE.SphereGeometry(5, 32, 32);
  const reactorGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.1,
    wireframe: true,
    blending: THREE.AdditiveBlending
  });
  const reactorGlow = new THREE.Mesh(reactorGlowGeometry, reactorGlowMaterial);
  reactorGroup.add(reactorGlow);

  // Внутренние энергетические сферы (пульсирующие)
  const innerGlowGeometry = new THREE.SphereGeometry(2, 32, 32);
  const innerGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    transparent: true,
    opacity: 0.3,
    wireframe: true,
    blending: THREE.AdditiveBlending
  });
  const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
  reactorGroup.add(innerGlow);

  // Электрические разряды (спорадические вспышки)
  const dischargeCount = 8;
  const discharges = [];
  for (let i = 0; i < dischargeCount; i++) {
    const dischargeGeometry = new THREE.ConeGeometry(0.08, 1.5, 6);
    const dischargeMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const discharge = new THREE.Mesh(dischargeGeometry, dischargeMaterial);
    
    const angle = (i / dischargeCount) * Math.PI * 2;
    discharge.position.x = Math.cos(angle) * 3;
    discharge.position.y = Math.sin(angle * 0.7) * 3;
    discharge.position.z = Math.sin(angle) * 3;
    discharge.lookAt(0, 0, 0);
    discharge.rotateX(Math.PI / 2);
    
    discharge.userData = {
      baseAngle: angle,
      flashOffset: Math.random() * Math.PI * 2,
      flashDuration: 0.3 + Math.random() * 0.4
    };
    reactorGroup.add(discharge);
    discharges.push(discharge);
  }

  // Дополнительные орбитальные частицы вокруг реактора
  const orbitParticleCount = 24;
  const orbitParticles = [];
  const orbitGeometry = new THREE.BufferGeometry();
  const orbitPositions = new Float32Array(orbitParticleCount * 3);
  const orbitSizes = new Float32Array(orbitParticleCount);

  for (let i = 0; i < orbitParticleCount; i++) {
    const angle = (i / orbitParticleCount) * Math.PI * 2;
    const radius = 5.5;
    orbitPositions[i * 3] = Math.cos(angle) * radius;
    orbitPositions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    orbitPositions[i * 3 + 2] = Math.sin(angle) * radius;
    orbitSizes[i] = 0.15 + Math.random() * 0.15;
    
    orbitParticles.push({
      baseAngle: angle,
      radius: radius,
      height: orbitPositions[i * 3 + 1],
      speed: 0.3 + Math.random() * 0.2
    });
  }

  orbitGeometry.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3));
  orbitGeometry.setAttribute('size', new THREE.BufferAttribute(orbitSizes, 1));

  const orbitMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: 0xa78bfa,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false
  });

  const orbitParticleSystem = new THREE.Points(orbitGeometry, orbitMaterial);
  reactorGroup.add(orbitParticleSystem);

  // Обработка изменения размера
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
    const delta = clock.getDelta();
    
    // Вращение основной группы
    mainGroup.rotation.y = elapsed * 0.15;
    mainGroup.rotation.x = Math.sin(elapsed * 0.1) * 0.2;

    // Анимация частиц
    const positions = particleGeometry.attributes.position.array;
    const sizes = particleGeometry.attributes.size.array;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = particles[i];
      const phase = elapsed * particle.speed + particle.offset;
      
      positions[i * 3] = particle.baseX + Math.sin(phase) * 0.5;
      positions[i * 3 + 1] = particle.baseY + Math.cos(phase * 0.7) * 0.5;
      positions[i * 3 + 2] = particle.baseZ + Math.sin(phase * 0.5) * 0.5;

      // Пульсация размера частиц
      sizes[i] = particleSizes[i] * (1 + Math.sin(phase) * 0.2);
    }
    particleGeometry.attributes.position.needsUpdate = true;
    particleGeometry.attributes.size.needsUpdate = true;

    // Обновление линий
    const linePos = lineGeometry.attributes.position.array;
    const lineCol = lineGeometry.attributes.color.array;
    let lineIndex = 0;

    connections.forEach(conn => {
      const i = conn.i;
      const j = conn.j;
      
      linePos[lineIndex * 6] = positions[i * 3];
      linePos[lineIndex * 6 + 1] = positions[i * 3 + 1];
      linePos[lineIndex * 6 + 2] = positions[i * 3 + 2];
      linePos[lineIndex * 6 + 3] = positions[j * 3];
      linePos[lineIndex * 6 + 4] = positions[j * 3 + 1];
      linePos[lineIndex * 6 + 5] = positions[j * 3 + 2];

      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const opacity = Math.max(0, 1 - (distance / maxDistance)) * 0.4;

      lineCol[lineIndex * 8 + 3] = opacity;
      lineCol[lineIndex * 8 + 7] = opacity;

      lineIndex++;
    });
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    // Анимация геометрических форм
    shapes.forEach((shape, index) => {
      const phase = elapsed * shape.userData.floatSpeed + shape.userData.floatOffset;
      shape.position.y = shape.userData.basePosition.y + Math.sin(phase) * 1.5;
      shape.rotation.x += shape.userData.rotationSpeed;
      shape.rotation.y += shape.userData.rotationSpeed * 0.7;
      shape.rotation.z += shape.userData.rotationSpeed * 0.5;
      
      // Орбитальное движение
      const orbitPhase = elapsed * 0.1 + index;
      shape.position.x = shape.userData.basePosition.x + Math.cos(orbitPhase) * 0.5;
      shape.position.z = shape.userData.basePosition.z + Math.sin(orbitPhase) * 0.5;
    });

    // ========== АНИМАЦИЯ РЕАКТОРА ==========
    const pulse = 1 + Math.sin(elapsed * 2.5) * 0.2;
    const pulseFast = 1 + Math.sin(elapsed * 4) * 0.15;
    const pulseSlow = 1 + Math.sin(elapsed * 1.5) * 0.1;

    // Внутреннее ядро - интенсивная пульсация
    innerCore.scale.set(pulseFast, pulseFast, pulseFast);
    innerCore.rotation.y = elapsed * 1.2;
    innerCore.rotation.x = elapsed * 0.8;
    innerCoreMaterial.opacity = 0.7 + Math.sin(elapsed * 3) * 0.3;

    // Средний слой - вращение в другую сторону
    midCore.scale.set(pulse, pulse, pulse);
    midCore.rotation.y = -elapsed * 0.9;
    midCore.rotation.z = elapsed * 0.6;
    midCoreMaterial.opacity = 0.5 + Math.sin(elapsed * 2) * 0.3;

    // Внешний слой - медленное вращение
    outerCore.scale.set(pulseSlow, pulseSlow, pulseSlow);
    outerCore.rotation.y = elapsed * 0.5;
    outerCore.rotation.x = elapsed * 0.4;
    outerCoreMaterial.opacity = 0.4 + Math.sin(elapsed * 1.8) * 0.2;

    // Вращающиеся кольца энергии
    energyRings.forEach((ring, i) => {
      const speed = ring.userData.rotationSpeed;
      if (ring.userData.axis === 'x') {
        ring.rotation.x += speed;
      } else if (ring.userData.axis === 'y') {
        ring.rotation.y += speed;
      } else if (ring.userData.axis === 'z') {
        ring.rotation.z += speed;
      }
      ring.material.opacity = 0.5 + Math.sin(elapsed * 2 + i) * 0.3;
    });

    // Светящиеся лучи - пульсация и вращение
    rays.forEach((ray, i) => {
      const phase = elapsed * 1.5 + ray.userData.pulseOffset;
      const extend = 1 + Math.sin(phase) * 0.4;
      ray.scale.set(1, extend, 1);
      ray.material.opacity = 0.4 + Math.sin(phase) * 0.4;
      
      // Вращение вокруг своей оси
      ray.rotation.z += 0.02;
    });

    // Частицы энергии - движение наружу и обратно
    const energyPositions = energyParticleGeometry.attributes.position.array;
    const energySizes = energyParticleGeometry.attributes.size.array;
    
    energyParticles.forEach((particle, i) => {
      const phase = elapsed * particle.speed + particle.offset;
      const radius = particle.baseRadius + Math.sin(phase) * 1.5;
      
      energyPositions[i * 3] = radius * Math.sin(particle.phi) * Math.cos(particle.angle + phase * 0.3);
      energyPositions[i * 3 + 1] = radius * Math.sin(particle.phi) * Math.sin(particle.angle + phase * 0.3);
      energyPositions[i * 3 + 2] = radius * Math.cos(particle.phi);
      
      energySizes[i] = (0.2 + Math.random() * 0.3) * (1 + Math.sin(phase) * 0.5);
    });
    energyParticleGeometry.attributes.position.needsUpdate = true;
    energyParticleGeometry.attributes.size.needsUpdate = true;
    energyParticleMaterial.opacity = 0.6 + Math.sin(elapsed * 2) * 0.3;

    // Внешнее свечение реактора
    reactorGlow.scale.set(pulseSlow * 1.1, pulseSlow * 1.1, pulseSlow * 1.1);
    reactorGlow.rotation.y = -elapsed * 0.2;
    reactorGlowMaterial.opacity = 0.08 + Math.sin(elapsed * 1.5) * 0.05;

    // Внутреннее свечение
    innerGlow.scale.set(pulseFast * 0.9, pulseFast * 0.9, pulseFast * 0.9);
    innerGlow.rotation.y = elapsed * 0.5;
    innerGlow.rotation.x = elapsed * 0.3;
    innerGlowMaterial.opacity = 0.2 + Math.sin(elapsed * 2.5) * 0.2;

    // Электрические разряды - спорадические вспышки
    discharges.forEach((discharge, i) => {
      const phase = elapsed * 0.8 + discharge.userData.flashOffset;
      const flash = Math.sin(phase * 10) > 0.7 ? 1 : 0;
      const intensity = flash * (0.5 + Math.random() * 0.5);
      
      discharge.material.opacity = intensity * 0.9;
      discharge.scale.y = 1 + intensity * 0.5;
      discharge.rotation.z += 0.1;
    });

    // Орбитальные частицы - вращение вокруг реактора
    const orbitPos = orbitGeometry.attributes.position.array;
    orbitParticles.forEach((particle, i) => {
      const angle = particle.baseAngle + elapsed * particle.speed;
      orbitPos[i * 3] = Math.cos(angle) * particle.radius;
      orbitPos[i * 3 + 1] = particle.height + Math.sin(elapsed * 2 + i) * 0.5;
      orbitPos[i * 3 + 2] = Math.sin(angle) * particle.radius;
    });
    orbitGeometry.attributes.position.needsUpdate = true;
    orbitMaterial.opacity = 0.6 + Math.sin(elapsed * 1.5) * 0.3;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
})();