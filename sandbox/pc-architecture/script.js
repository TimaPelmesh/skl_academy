// Scene setup
let scene, camera, renderer;
let controls;
let pcCase;
let raycaster, mouse;
let hoveredObject = null;
let fanBlades = []; // Массив для всех лопастей вентиляторов

// Component information
const componentInfo = {
    motherboard: {
        name: "Материнская плата",
        description: "Основная плата компьютера, объединяющая все компоненты. Содержит сокет для процессора, слоты DIMM для RAM, разъёмы PCI-E для видеокарт, SATA и M.2 для накопителей. Типы форм-факторов: ATX, microATX, mini-ITX."
    },
    cpu: {
        name: "Процессор (CPU)",
        description: "Центральный процессор — мозг компьютера. Выполняет все вычисления. Состоит из ядер (2-64+), каждое обрабатывает потоки. Производители: Intel (Core i3/i5/i7/i9), AMD (Ryzen 3/5/7/9). Требует активного охлаждения."
    },
    cpuCooler: {
        name: "Кулер процессора",
        description: "Система охлаждения CPU. Отводит тепло от процессора через радиатор и вентилятор. Типы: воздушные (башенные, top-flow) и жидкостные (AIO, custom loop). Эффективность зависит от TDP процессора."
    },
    ram: {
        name: "Оперативная память (RAM)",
        description: "Быстрая временная память для активных программ и данных. При выключении данные теряются. Типы: DDR4, DDR5. Объём влияет на многозадачность. Устанавливается в слоты DIMM парами для dual-channel."
    },
    gpu: {
        name: "Видеокарта (GPU)",
        description: "Графический процессор для обработки изображений. Необходима для игр, 3D, видеомонтажа. Имеет собственную память VRAM. Производители: NVIDIA (GeForce), AMD (Radeon). Подключается через PCI-E x16."
    },
    psu: {
        name: "Блок питания (PSU)",
        description: "Преобразует 220V из розетки в 12V, 5V, 3.3V для компонентов. Мощность в ваттах (500W-1500W). Типы: модульные и немодульные. Сертификация 80+ показывает КПД. Критически важен для стабильности системы."
    },
    ssd: {
        name: "SSD накопитель",
        description: "Твердотельный накопитель на флеш-памяти. Быстрее HDD в 5-10 раз, без движущихся частей. Типы: SATA (550 МБ/с), NVMe M.2 (до 7000 МБ/с). Идеален для ОС и программ."
    },
    hdd: {
        name: "Жёсткий диск (HDD)",
        description: "Механический накопитель с магнитными дисками. Дешевле SSD за гигабайт, но медленнее. Скорость: 5400/7200 RPM. Используется для хранения больших файлов. Чувствителен к вибрациям."
    },
    fan: {
        name: "Корпусный вентилятор",
        description: "Обеспечивает циркуляцию воздуха в корпусе. Передние — на вдув холодного воздуха, задние/верхние — на выдув горячего. Размеры: 120mm, 140mm. RGB-подсветка для эстетики."
    }
};

function init() {
    if (typeof THREE === 'undefined') {
        console.error('Three.js не загружен!');
        document.getElementById('loading').textContent = 'Ошибка загрузки';
        return;
    }

    const container = document.getElementById('canvas-container');
    const navHeight = window.innerWidth <= 480 ? 44 : (window.innerWidth <= 768 ? 48 : 56);
    const width = window.innerWidth;
    const height = window.innerHeight - navHeight;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a18);
    scene.fog = new THREE.Fog(0x0a0a18, 6, 15);

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(1.8, 1.5, 2.2);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 0.8;
    controls.maxDistance = 5;
    controls.target.set(0.5, 1.0, 0);
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.update();

    // Raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Setup scene
    setupLighting();
    createRoom();
    createDesk();
    createMonitor();
    createKeyboardMouse();
    createPCCase();

    // Events
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('touchend', onTouchEnd, { passive: true });
    document.getElementById('close-btn').addEventListener('click', closeInfoPanel);

    // Hide loading
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 800);

    // Start animation loop
    animate();
}

function setupLighting() {
    const ambient = new THREE.AmbientLight(0x303050, 0.3);
    scene.add(ambient);

    const mainLight = new THREE.SpotLight(0xffffff, 1.5, 8, Math.PI / 5, 0.3);
    mainLight.position.set(1, 3.5, 1);
    mainLight.target.position.set(0.5, 1, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);
    scene.add(mainLight.target);

    const pcGlow = new THREE.PointLight(0x00ffff, 2, 3);
    pcGlow.position.set(0.5, 1.1, 0.1);
    scene.add(pcGlow);

    const pcGlow2 = new THREE.PointLight(0x8000ff, 0.8, 2);
    pcGlow2.position.set(0.5, 0.9, -0.1);
    scene.add(pcGlow2);

    const rimLight = new THREE.DirectionalLight(0x4060ff, 0.5);
    rimLight.position.set(-2, 2, -2);
    scene.add(rimLight);
}

function createRoom() {
    const roomWidth = 6;
    const roomHeight = 4;
    const roomDepth = 6;

    const floorGeo = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const floorMat = new THREE.MeshStandardMaterial({ 
        color: 0x12121f,
        roughness: 0.85,
        metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const gridHelper = new THREE.GridHelper(roomWidth, 12, 0x00ffff, 0x0a1520);
    gridHelper.position.y = 0.003;
    gridHelper.material.opacity = 0.4;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    const wallMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a15,
        roughness: 0.95
    });

    const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomWidth, roomHeight),
        wallMat
    );
    backWall.position.set(0, roomHeight / 2, -roomDepth / 2);
    scene.add(backWall);

    const leftWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomDepth, roomHeight),
        wallMat
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
    scene.add(leftWall);

    const neonMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5
    });

    const backNeon = new THREE.Mesh(
        new THREE.BoxGeometry(roomWidth * 0.6, 0.015, 0.015),
        neonMat
    );
    backNeon.position.set(0, 0.4, -roomDepth / 2 + 0.02);
    scene.add(backNeon);
}

function createDesk() {
    const deskGroup = new THREE.Group();

    const deskWidth = 1.8;
    const deskDepth = 0.7;
    const deskHeight = 0.75;
    const topThickness = 0.035;

    const deskTopMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a28,
        roughness: 0.6,
        metalness: 0.2
    });

    const deskTop = new THREE.Mesh(
        new THREE.BoxGeometry(deskWidth, topThickness, deskDepth),
        deskTopMat
    );
    deskTop.position.y = deskHeight;
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    deskGroup.add(deskTop);

    const legMat = new THREE.MeshStandardMaterial({
        color: 0x151520,
        roughness: 0.3,
        metalness: 0.8
    });

    const legPositions = [
        [-deskWidth / 2 + 0.08, 0, -deskDepth / 2 + 0.08],
        [deskWidth / 2 - 0.08, 0, -deskDepth / 2 + 0.08],
        [-deskWidth / 2 + 0.08, 0, deskDepth / 2 - 0.08],
        [deskWidth / 2 - 0.08, 0, deskDepth / 2 - 0.08]
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, deskHeight, 0.04),
            legMat
        );
        leg.position.set(pos[0], deskHeight / 2, pos[2]);
        leg.castShadow = true;
        deskGroup.add(leg);
    });

    scene.add(deskGroup);
}

function createMonitor() {
    const monitorGroup = new THREE.Group();

    const baseMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a12,
            roughness: 0.3,
            metalness: 0.7
    });

    const standBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.012, 0.15),
        baseMat
    );
    standBase.position.set(0, 0.76, -0.22);
    monitorGroup.add(standBase);

    const standNeck = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.18, 0.03),
        baseMat
    );
    standNeck.position.set(0, 0.86, -0.22);
    monitorGroup.add(standNeck);

    const frameMat = new THREE.MeshStandardMaterial({
        color: 0x050508,
            roughness: 0.4,
        metalness: 0.5
    });

    const monitorFrame = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.35, 0.025),
        frameMat
    );
    monitorFrame.position.set(0, 1.12, -0.25);
    monitorGroup.add(monitorFrame);

    const screenMat = new THREE.MeshStandardMaterial({
        color: 0x020204,
        roughness: 0.1,
        metalness: 0.3
    });

    const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.52, 0.32),
        screenMat
    );
    screen.position.set(0, 1.12, -0.237);
    monitorGroup.add(screen);

    monitorGroup.position.x = -0.35;
    scene.add(monitorGroup);
    }
    
function createKeyboardMouse() {
    // Keyboard
    const kbGroup = new THREE.Group();

    const kbBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.015, 0.12),
        new THREE.MeshStandardMaterial({
            color: 0x1a1a2a,
            roughness: 0.4,
            metalness: 0.5
        })
    );
    kbGroup.add(kbBase);

    const keysArea = new THREE.Mesh(
        new THREE.BoxGeometry(0.33, 0.008, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x2a2a3a })
    );
    keysArea.position.y = 0.01;
    kbGroup.add(keysArea);

    // RGB underglow
    const kbRgb = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.002, 0.11),
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.8
        })
    );
    kbRgb.position.y = -0.005;
    kbGroup.add(kbRgb);

    kbGroup.position.set(-0.35, 0.76, 0.15);
    scene.add(kbGroup);

    // Mouse
    const mouseMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a2a,
        roughness: 0.3,
        metalness: 0.5
    });

    const mouseBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.025, 0.09),
        mouseMat
    );
    mouseBody.position.set(0, 0.77, 0.15);
    scene.add(mouseBody);

    // Mouse RGB
    const mouseRgb = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.001, 0.06),
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 1
        })
    );
    mouseRgb.position.set(0, 0.785, 0.15);
    scene.add(mouseRgb);
}

function createPCCase() {
    pcCase = new THREE.Group();

    const W = 0.22;
    const H = 0.46;
    const D = 0.42;
    const T = 0.012;

    const frameMat = new THREE.MeshStandardMaterial({
        color: 0x18182a,
        roughness: 0.3,
        metalness: 0.85
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.12,
        roughness: 0.05,
        metalness: 0,
        transmission: 0.92,
        thickness: 0.004
    });

    const darkMat = new THREE.MeshStandardMaterial({
        color: 0x08080f,
        roughness: 0.5,
        metalness: 0.6
    });

    // Frame edges
    const frameEdge = new THREE.BoxGeometry(0.014, H, 0.014);
    
    const fl = new THREE.Mesh(frameEdge, frameMat);
    fl.position.set(-W/2, H/2, D/2);
    pcCase.add(fl);
    
    const fr = new THREE.Mesh(frameEdge, frameMat);
    fr.position.set(W/2, H/2, D/2);
    pcCase.add(fr);
    
    const bl = new THREE.Mesh(frameEdge, frameMat);
    bl.position.set(-W/2, H/2, -D/2);
    pcCase.add(bl);
    
    const br = new THREE.Mesh(frameEdge, frameMat);
    br.position.set(W/2, H/2, -D/2);
    pcCase.add(br);

    const topFront = new THREE.Mesh(new THREE.BoxGeometry(W, 0.014, 0.014), frameMat);
    topFront.position.set(0, H, D/2);
    pcCase.add(topFront);

    const topBack = new THREE.Mesh(new THREE.BoxGeometry(W, 0.014, 0.014), frameMat);
    topBack.position.set(0, H, -D/2);
    pcCase.add(topBack);

    const topLeft = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.014, D), frameMat);
    topLeft.position.set(-W/2, H, 0);
    pcCase.add(topLeft);

    const topRight = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.014, D), frameMat);
    topRight.position.set(W/2, H, 0);
    pcCase.add(topRight);

    const botFront = new THREE.Mesh(new THREE.BoxGeometry(W, 0.014, 0.014), frameMat);
    botFront.position.set(0, 0, D/2);
    pcCase.add(botFront);

    // Glass panels
    const leftGlass = new THREE.Mesh(
        new THREE.BoxGeometry(0.003, H * 0.94, D * 0.94),
        glassMat
    );
    leftGlass.position.set(-W/2 - 0.002, H/2, 0);
    pcCase.add(leftGlass);

    const frontGlass = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.94, H * 0.65, 0.003),
        glassMat
    );
    frontGlass.position.set(0, H * 0.58, D/2 + 0.002);
    pcCase.add(frontGlass);

    // Solid panels
    const rightPanel = new THREE.Mesh(
        new THREE.BoxGeometry(T, H, D),
        frameMat
    );
    rightPanel.position.set(W/2 + T/2, H/2, 0);
    pcCase.add(rightPanel);

    const backPanel = new THREE.Mesh(
        new THREE.BoxGeometry(W, H, T),
        darkMat
    );
    backPanel.position.set(0, H/2, -D/2 - T/2);
    pcCase.add(backPanel);

    const topPanel = new THREE.Mesh(
        new THREE.BoxGeometry(W, T, D),
        frameMat
    );
    topPanel.position.set(0, H + T/2, 0);
    pcCase.add(topPanel);

    const bottomPanel = new THREE.Mesh(
        new THREE.BoxGeometry(W, T, D),
        frameMat
    );
    bottomPanel.position.set(0, -T/2, 0);
    pcCase.add(bottomPanel);

    const frontIO = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.94, H * 0.18, T),
        darkMat
    );
    frontIO.position.set(0, H * 0.1, D/2);
    pcCase.add(frontIO);

    // Power button
    const powerBtn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.004, 16),
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 1
        })
    );
    powerBtn.rotation.x = Math.PI / 2;
    powerBtn.position.set(0, H * 0.12, D/2 + 0.008);
    pcCase.add(powerBtn);

    // RGB strips
    const rgbMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 1.5
    });

    const bottomRgb = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.8, 0.006, D * 0.8),
        rgbMat
    );
    bottomRgb.position.set(0, 0.008, 0);
    pcCase.add(bottomRgb);

    const frontRgbL = new THREE.Mesh(
        new THREE.BoxGeometry(0.004, H * 0.45, 0.004),
        rgbMat
    );
    frontRgbL.position.set(-W/2 + 0.018, H * 0.6, D/2 - 0.01);
    pcCase.add(frontRgbL);

    const frontRgbR = new THREE.Mesh(
        new THREE.BoxGeometry(0.004, H * 0.45, 0.004),
        rgbMat
    );
    frontRgbR.position.set(W/2 - 0.018, H * 0.6, D/2 - 0.01);
    pcCase.add(frontRgbR);

    // Create components
    createMotherboard(W, H, D, T);
    createCPU(W, H, D);
    createRAM(W, H, D);
    createGPU(W, H, D);
    createPSU(W, H, D, T);
    createStorage(W, H, D);
    createFans(W, H, D, T);

    pcCase.position.set(0.55, 0.785, 0);
    pcCase.castShadow = true;
    scene.add(pcCase);
}

function createMotherboard(W, H, D, T) {
    const mbGroup = new THREE.Group();

    const mbW = W * 0.8;
    const mbH = H * 0.52;
    const mbT = 0.006;

    const pcbMat = new THREE.MeshStandardMaterial({
        color: 0x1a3a1a,
        roughness: 0.7,
        metalness: 0.1
    });
    const pcb = new THREE.Mesh(
        new THREE.BoxGeometry(mbW, mbH, mbT),
        pcbMat
    );
    mbGroup.add(pcb);

    const traceMat = new THREE.MeshStandardMaterial({
        color: 0x2d5d2d,
        emissive: 0x1a3d1a,
        emissiveIntensity: 0.15
    });
    for (let i = 0; i < 10; i++) {
        const trace = new THREE.Mesh(
            new THREE.BoxGeometry(0.0015, Math.random() * mbH * 0.3 + 0.02, 0.001),
            traceMat
        );
        trace.position.set(
            (Math.random() - 0.5) * mbW * 0.75,
            (Math.random() - 0.5) * mbH * 0.6,
            mbT/2 + 0.001
        );
        mbGroup.add(trace);
    }

    const socket = new THREE.Mesh(
        new THREE.BoxGeometry(0.042, 0.042, 0.005),
        new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: 0.5 })
    );
    socket.position.set(-mbW * 0.12, mbH * 0.2, mbT/2 + 0.003);
    mbGroup.add(socket);

    for (let i = 0; i < 4; i++) {
        const dimm = new THREE.Mesh(
            new THREE.BoxGeometry(0.004, 0.07, 0.005),
            new THREE.MeshStandardMaterial({ color: 0x252530 })
        );
        dimm.position.set(mbW * 0.22 + i * 0.009, mbH * 0.15, mbT/2 + 0.003);
        mbGroup.add(dimm);
    }

    for (let i = 0; i < 2; i++) {
        const pcie = new THREE.Mesh(
            new THREE.BoxGeometry(0.065, 0.008, 0.005),
            new THREE.MeshStandardMaterial({ color: 0x151520 })
        );
        pcie.position.set(0, -mbH * 0.15 - i * 0.04, mbT/2 + 0.003);
        mbGroup.add(pcie);
    }

    const chipset = new THREE.Mesh(
        new THREE.BoxGeometry(0.028, 0.028, 0.01),
        new THREE.MeshStandardMaterial({ color: 0x404050, metalness: 0.7 })
    );
    chipset.position.set(mbW * 0.12, -mbH * 0.28, mbT/2 + 0.005);
    mbGroup.add(chipset);

    const ioShield = new THREE.Mesh(
        new THREE.BoxGeometry(mbW * 0.35, 0.028, 0.012),
        new THREE.MeshStandardMaterial({ color: 0x303040 })
        );
    ioShield.position.set(mbW * 0.18, mbH/2 - 0.02, mbT/2 + 0.006);
    mbGroup.add(ioShield);

    const power24 = new THREE.Mesh(
        new THREE.BoxGeometry(0.008, 0.035, 0.015),
        new THREE.MeshStandardMaterial({ color: 0x101015 })
    );
    power24.position.set(mbW/2 - 0.01, mbH * 0.1, mbT/2 + 0.008);
    mbGroup.add(power24);

    mbGroup.rotation.y = Math.PI / 2;
    mbGroup.position.set(W/2 - T - mbT/2 - 0.006, H * 0.58, 0);
    mbGroup.userData = { type: 'motherboard', name: 'motherboard' };
    pcCase.add(mbGroup);
}

function createCPU(W, H, D) {
    const cpuGroup = new THREE.Group();

    const cpuDie = new THREE.Mesh(
        new THREE.BoxGeometry(0.032, 0.032, 0.003),
        new THREE.MeshStandardMaterial({ color: 0x2a2a35, metalness: 0.8 })
    );
    cpuGroup.add(cpuDie);

    cpuGroup.rotation.y = Math.PI / 2;
    cpuGroup.position.set(W/2 - 0.03, H * 0.68, 0.02);
    cpuGroup.userData = { type: 'cpu', name: 'cpu' };
    pcCase.add(cpuGroup);

    createCPUCooler(W, H, D);
}

function createCPUCooler(W, H, D) {
    const coolerGroup = new THREE.Group();

    const base = new THREE.Mesh(
        new THREE.BoxGeometry(0.038, 0.038, 0.006),
        new THREE.MeshStandardMaterial({ color: 0x404050, metalness: 0.8 })
    );
    coolerGroup.add(base);

    const finMat = new THREE.MeshStandardMaterial({ color: 0x505060, metalness: 0.7 });
    for (let i = 0; i < 8; i++) {
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(0.034, 0.045, 0.0018),
            finMat
        );
        fin.position.set(0, 0.026, 0.005 + i * 0.0035);
        coolerGroup.add(fin);
    }

    const fanShroud = new THREE.Mesh(
        new THREE.BoxGeometry(0.038, 0.045, 0.01),
        new THREE.MeshStandardMaterial({ color: 0x252530, transparent: true, opacity: 0.7 })
    );
    fanShroud.position.set(0, 0.026, 0.045);
    coolerGroup.add(fanShroud);

    // Fan blades
    const bladeGroup = new THREE.Group();
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x353540 });
    for (let i = 0; i < 7; i++) {
        const blade = new THREE.Mesh(
            new THREE.BoxGeometry(0.014, 0.0025, 0.006),
            bladeMat
        );
        const angle = (i / 7) * Math.PI * 2;
        blade.rotation.z = angle;
        blade.position.x = Math.cos(angle) * 0.01;
        blade.position.y = Math.sin(angle) * 0.01 + 0.026;
        bladeGroup.add(blade);
    }
    bladeGroup.position.z = 0.045;
    coolerGroup.add(bladeGroup);

    // Add to animation array
    fanBlades.push({ group: bladeGroup, speed: 0.15 });

    const rgbRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.018, 0.0018, 8, 20),
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 1.2
        })
    );
    rgbRing.position.set(0, 0.026, 0.052);
    coolerGroup.add(rgbRing);

    coolerGroup.rotation.y = Math.PI / 2;
    coolerGroup.position.set(W/2 - 0.045, H * 0.68, 0.02);
    coolerGroup.userData = { type: 'cpuCooler', name: 'cpuCooler' };
    pcCase.add(coolerGroup);
    }

function createRAM(W, H, D) {
    const ramGroup = new THREE.Group();

    // RAM sticks - уменьшенные размеры чтобы поместились на материнке
    for (let i = 0; i < 2; i++) {
        const stick = new THREE.Group();

        // PCB - вертикальная планка
        const pcb = new THREE.Mesh(
            new THREE.BoxGeometry(0.003, 0.028, 0.055),
            new THREE.MeshStandardMaterial({ color: 0x1a3a1a })
        );
        stick.add(pcb);

        // Heatspreader
        const heatspreader = new THREE.Mesh(
            new THREE.BoxGeometry(0.005, 0.032, 0.052),
            new THREE.MeshStandardMaterial({ color: 0x252530, metalness: 0.7 })
            );
        stick.add(heatspreader);

        // RGB strip on top
        const rgb = new THREE.Mesh(
            new THREE.BoxGeometry(0.001, 0.004, 0.048),
            new THREE.MeshStandardMaterial({
                color: 0x00ffff,
                emissive: 0x00ffff,
                emissiveIntensity: 1.8
            })
        );
        rgb.position.y = 0.016;
        stick.add(rgb);

        // Spacing between sticks
        stick.position.z = i * 0.008;
        ramGroup.add(stick);
    }

    // Поворот и позиция - рядом со слотами DIMM на материнке
    // Материнка на x ≈ 0.089, RAM должна быть чуть левее (внутрь корпуса)
    ramGroup.rotation.y = Math.PI / 2;
    ramGroup.position.set(W/2 - 0.038, H * 0.68, -0.035);
    ramGroup.userData = { type: 'ram', name: 'ram' };
    pcCase.add(ramGroup);
}

function createGPU(W, H, D) {
    const gpuGroup = new THREE.Group();

    const gpuLength = 0.18;
    const gpuHeight = 0.09;

    const pcb = new THREE.Mesh(
        new THREE.BoxGeometry(gpuLength, 0.003, gpuHeight),
        new THREE.MeshStandardMaterial({ color: 0x1a3a1a })
    );
    gpuGroup.add(pcb);

    const backplate = new THREE.Mesh(
        new THREE.BoxGeometry(gpuLength - 0.01, 0.0025, gpuHeight - 0.01),
        new THREE.MeshStandardMaterial({ color: 0x252530, metalness: 0.8 })
    );
    backplate.position.y = 0.003;
    gpuGroup.add(backplate);

    const shroud = new THREE.Mesh(
        new THREE.BoxGeometry(gpuLength - 0.015, 0.028, gpuHeight - 0.01),
        new THREE.MeshStandardMaterial({ color: 0x151520 })
        );
    shroud.position.y = -0.017;
    gpuGroup.add(shroud);

    // GPU Fans
    for (let i = 0; i < 2; i++) {
        const fanGroup = new THREE.Group();
        
        const housing = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 0.006, 18),
            new THREE.MeshStandardMaterial({ color: 0x252530 })
    );
        housing.rotation.x = Math.PI / 2;
        fanGroup.add(housing);

        const blades = new THREE.Group();
        for (let j = 0; j < 9; j++) {
            const blade = new THREE.Mesh(
                new THREE.BoxGeometry(0.016, 0.0018, 0.006),
                new THREE.MeshStandardMaterial({ color: 0x353540 })
        );
            blade.rotation.z = (j / 9) * Math.PI * 2;
            blades.add(blade);
    }
        fanGroup.add(blades);
        fanGroup.position.set(-0.04 + i * 0.08, -0.032, 0);
        gpuGroup.add(fanGroup);
        
        // Add to animation array
        fanBlades.push({ group: blades, speed: 0.2 });
    }

    const rgbStrip = new THREE.Mesh(
        new THREE.BoxGeometry(gpuLength - 0.02, 0.0025, 0.003),
                new THREE.MeshStandardMaterial({
            color: 0x00ffff,
                    emissive: 0x00ffff,
            emissiveIntensity: 1.2
                })
            );
    rgbStrip.position.set(0, -0.033, gpuHeight/2 - 0.01);
    gpuGroup.add(rgbStrip);

    const pcie = new THREE.Mesh(
        new THREE.BoxGeometry(0.065, 0.012, 0.008),
        new THREE.MeshStandardMaterial({ color: 0x8a7030 })
    );
    pcie.position.set(0.03, 0.008, gpuHeight/2 - 0.006);
    gpuGroup.add(pcie);

    gpuGroup.rotation.z = Math.PI / 2;
    gpuGroup.position.set(W/2 - 0.07, H * 0.38, 0.01);
    gpuGroup.userData = { type: 'gpu', name: 'gpu' };
    pcCase.add(gpuGroup);
}

function createPSU(W, H, D, T) {
    const psuGroup = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.13, 0.07, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x151520, metalness: 0.6 })
    );
    psuGroup.add(body);

    const grill = new THREE.Mesh(
        new THREE.CircleGeometry(0.025, 20),
        new THREE.MeshStandardMaterial({ color: 0x08080c, side: THREE.DoubleSide })
    );
    grill.rotation.x = -Math.PI / 2;
    grill.position.y = 0.036;
    psuGroup.add(grill);

    for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.008 + i * 0.006, 0.001, 6, 16),
            new THREE.MeshStandardMaterial({ color: 0x303040 })
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.037;
        psuGroup.add(ring);
    }

    psuGroup.position.set(0, T + 0.037, -D/2 + 0.085);
    psuGroup.userData = { type: 'psu', name: 'psu' };
    pcCase.add(psuGroup);
}

function createStorage(W, H, D) {
    const ssdGroup = new THREE.Group();
    const ssdBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.055, 0.005, 0.075),
        new THREE.MeshStandardMaterial({ color: 0x252530, metalness: 0.7 })
    );
    ssdGroup.add(ssdBody);

    const ssdLabel = new THREE.Mesh(
        new THREE.BoxGeometry(0.038, 0.001, 0.05),
        new THREE.MeshStandardMaterial({ color: 0x151520 })
    );
    ssdLabel.position.y = 0.003;
    ssdGroup.add(ssdLabel);

    ssdGroup.position.set(-W/2 + 0.04, 0.08, D/2 - 0.06);
    ssdGroup.userData = { type: 'ssd', name: 'ssd' };
    pcCase.add(ssdGroup);

    const hddGroup = new THREE.Group();
    const hddBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.075, 0.018, 0.12),
        new THREE.MeshStandardMaterial({ color: 0x303040, metalness: 0.6 })
    );
    hddGroup.add(hddBody);

    const hddLabel = new THREE.Mesh(
        new THREE.BoxGeometry(0.055, 0.001, 0.09),
        new THREE.MeshStandardMaterial({ color: 0x202030 })
    );
    hddLabel.position.y = 0.01;
    hddGroup.add(hddLabel);

    hddGroup.position.set(-W/2 + 0.05, 0.05, D/2 - 0.085);
    hddGroup.userData = { type: 'hdd', name: 'hdd' };
    pcCase.add(hddGroup);
}

function createFans(W, H, D, T) {
    for (let i = 0; i < 2; i++) {
        createCaseFan(0, 0.12 + i * 0.12, D/2 - 0.018, 0, 0, 0, true);
    }
    createCaseFan(0, H * 0.72, -D/2 + 0.018, 0, Math.PI, 0, true);
}

function createCaseFan(x, y, z, rx, ry, rz, hasRgb) {
        const fanGroup = new THREE.Group();

    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x252530 })
    );
    fanGroup.add(frame);

    const opening = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.021, 20),
        new THREE.MeshStandardMaterial({ color: 0x151520 })
        );
    opening.rotation.x = Math.PI / 2;
    fanGroup.add(opening);

        const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.01, 10),
        new THREE.MeshStandardMaterial({ color: 0x151520 })
        );
        hub.rotation.x = Math.PI / 2;
        fanGroup.add(hub);

    // Blades
    const blades = new THREE.Group();
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x404050 });
        for (let i = 0; i < 7; i++) {
            const blade = new THREE.Mesh(
            new THREE.BoxGeometry(0.03, 0.0025, 0.01),
            bladeMat
            );
            const angle = (i / 7) * Math.PI * 2;
            blade.rotation.z = angle;
        blade.position.x = Math.cos(angle) * 0.02;
        blade.position.y = Math.sin(angle) * 0.02;
        blades.add(blade);
    }
    fanGroup.add(blades);
    
    // Add to animation array
    fanBlades.push({ group: blades, speed: 0.12 });

    if (hasRgb) {
        const rgb = new THREE.Mesh(
            new THREE.TorusGeometry(0.042, 0.0025, 8, 20),
                new THREE.MeshStandardMaterial({
                    color: 0x00ffff,
                    emissive: 0x00ffff,
                emissiveIntensity: 1
                })
            );
        rgb.rotation.x = Math.PI / 2;
        fanGroup.add(rgb);
        }

    fanGroup.position.set(x, y, z);
    fanGroup.rotation.set(rx, ry, rz);
        fanGroup.userData = { type: 'fan', name: 'fan' };
    pcCase.add(fanGroup);
}

// Event handlers
function onWindowResize() {
    const navHeight = window.innerWidth <= 480 ? 44 : (window.innerWidth <= 768 ? 48 : 56);
    const width = window.innerWidth;
    const height = window.innerHeight - navHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function getComponentFromIntersect(intersects) {
    for (let i = 0; i < intersects.length; i++) {
        let obj = intersects[i].object;
        
        // Traverse up to find component with userData.name
        while (obj) {
            if (obj.userData && obj.userData.name && componentInfo[obj.userData.name]) {
                return obj;
            }
            obj = obj.parent;
        }
    }
    return null;
}

function onMouseMove(event) {
    const navHeight = window.innerWidth <= 480 ? 44 : (window.innerWidth <= 768 ? 48 : 56);
    const height = window.innerHeight - navHeight;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY - navHeight) / height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    // Check all objects in scene recursively
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Reset previous hover
    if (hoveredObject) {
        setHighlight(hoveredObject, false);
        hoveredObject = null;
    }

    // Find component
    const component = getComponentFromIntersect(intersects);
    
    if (component) {
        hoveredObject = component;
        setHighlight(component, true);
            renderer.domElement.style.cursor = 'pointer';
        } else {
        renderer.domElement.style.cursor = 'grab';
    }
}

function setHighlight(object, active) {
    object.traverse((child) => {
        if (child.isMesh && child.material) {
            // Skip transparent materials (glass)
            if (child.material.transparent && child.material.opacity < 0.5) return;
            
            if (active) {
                if (child.userData.origEmissive === undefined) {
                    child.userData.origEmissive = child.material.emissive ? child.material.emissive.getHex() : 0;
                    child.userData.origIntensity = child.material.emissiveIntensity || 0;
                            }
                if (child.material.emissive) {
                        child.material.emissive.setHex(0x00ffff);
                    child.material.emissiveIntensity = 0.6;
                }
                    } else {
                if (child.material.emissive && child.userData.origEmissive !== undefined) {
                    child.material.emissive.setHex(child.userData.origEmissive);
                    child.material.emissiveIntensity = child.userData.origIntensity;
                }
            }
        }
    });
}

function onMouseClick(event) {
    const navHeight = window.innerWidth <= 480 ? 44 : (window.innerWidth <= 768 ? 48 : 56);
    const height = window.innerHeight - navHeight;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY - navHeight) / height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    const component = getComponentFromIntersect(intersects);
    
    if (component) {
        showInfoPanel(componentInfo[component.userData.name]);
    } else if (!document.getElementById('info-panel').classList.contains('hidden')) {
        closeInfoPanel();
        }
}

function onTouchEnd(event) {
    if (event.changedTouches.length === 1) {
        const touch = event.changedTouches[0];
        const navHeight = window.innerWidth <= 480 ? 44 : (window.innerWidth <= 768 ? 48 : 56);
        const height = window.innerHeight - navHeight;

        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -((touch.clientY - navHeight) / height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        const component = getComponentFromIntersect(intersects);
        
        if (component) {
            showInfoPanel(componentInfo[component.userData.name]);
        }
    }
}

function showInfoPanel(info) {
    document.getElementById('component-name').textContent = info.name;
    document.getElementById('component-description').textContent = info.description;
    document.getElementById('info-panel').classList.remove('hidden');
}

function closeInfoPanel() {
    document.getElementById('info-panel').classList.add('hidden');
}

function animate() {
    requestAnimationFrame(animate);

    // Animate all fans
    for (let i = 0; i < fanBlades.length; i++) {
        fanBlades[i].group.rotation.z += fanBlades[i].speed;
        }

    controls.update();
        renderer.render(scene, camera);
}

// Start
function waitForThree() {
    if (typeof THREE !== 'undefined' && typeof THREE.OrbitControls !== 'undefined') {
        init();
    } else {
        setTimeout(waitForThree, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForThree);
} else {
    waitForThree();
}
