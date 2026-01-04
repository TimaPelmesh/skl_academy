// Scene setup
let scene, camera, renderer, composer;
let controls;
let pcCase, motherboard, cpu, ram, gpu, psu, ssd, hdd, fans, cables;
let raycaster, mouse;
let hoveredObject = null;
let cameraAnimation = null;
let dustParticles = null;

// Component information
const componentInfo = {
    motherboard: {
        name: "Материнская плата",
        description: "Основная плата компьютера, которая объединяет все компоненты системы. Содержит сокет для процессора, слоты для оперативной памяти (DIMM), разъемы PCI-E для видеокарт и других устройств, разъемы SATA и M.2 для накопителей, чипсет для управления компонентами. Типы: ATX, microATX, mini-ITX. Обеспечивает связь между всеми частями ПК."
    },
    cpu: {
        name: "Процессор",
        description: "Центральный процессор (CPU) - мозг компьютера, выполняет все вычисления и обработку данных. Состоит из ядер (от 2 до 64+), каждое ядро может обрабатывать потоки. Типы: Intel (Core i3/i5/i7/i9), AMD (Ryzen 3/5/7/9). Устанавливается в сокет на материнской плате. Требует охлаждения (кулер или водяное охлаждение) для отвода тепла."
    },
    ram: {
        name: "Оперативная память",
        description: "Временное хранилище данных для быстрого доступа процессора. Хранит запущенные программы и данные, которые активно используются. При выключении ПК данные теряются. Типы: DDR3, DDR4, DDR5. Объем влияет на производительность - чем больше, тем больше программ можно запустить одновременно. Устанавливается в слоты DIMM на материнской плате."
    },
    gpu: {
        name: "Видеокарта",
        description: "Графический процессор (GPU) обрабатывает изображение и выводит его на монитор. Незаменима для игр, 3D-моделирования, видеомонтажа. Содержит собственную память (VRAM). Типы: интегрированная (в процессоре) и дискретная (отдельная плата). Мощные видеокарты имеют систему охлаждения с вентиляторами или водяным охлаждением. Подключается через слот PCI-E."
    },
    psu: {
        name: "Блок питания",
        description: "Преобразует переменный ток из розетки (220V) в постоянный ток для компонентов ПК (12V, 5V, 3.3V). Обеспечивает стабильное питание всех устройств. Типы: модульные (кабели отсоединяются), полумодульные, немодульные. Мощность измеряется в ваттах (W). Содержит конденсаторы для сглаживания напряжения и трансформатор для преобразования. Важен для стабильности системы."
    },
    ssd: {
        name: "SSD накопитель",
        description: "Твердотельный накопитель - быстрая память для хранения данных без движущихся частей. Использует флеш-память. В разы быстрее HDD. Типы: SATA (2.5\"), M.2 SATA, M.2 NVMe (самый быстрый). Используется для операционной системы и программ для быстрой загрузки. Не боится вибраций. Ограниченное количество циклов записи, но для обычного использования хватает на годы."
    },
    hdd: {
        name: "HDD накопитель",
        description: "Жесткий диск - механическое устройство хранения данных с вращающимися магнитными дисками. Медленнее SSD, но дешевле за гигабайт. Типы: 3.5\" (десктоп), 2.5\" (ноутбук). Скорость вращения: 5400, 7200, 10000 RPM. Используется для хранения больших объемов данных (фото, видео, документы). Подключается через SATA. Боится ударов и вибраций."
    },
    fan: {
        name: "Корпусный вентилятор",
        description: "Обеспечивает циркуляцию воздуха внутри корпуса для охлаждения компонентов. Создает поток воздуха: всасывает холодный воздух и выдувает горячий. Типы: 80mm, 120mm, 140mm, 200mm. Размещаются на передней, задней, верхней и боковой панелях корпуса. RGB версии добавляют подсветку для эстетики. Важны для поддержания оптимальной температуры компонентов."
    }
};

// Initialize scene
function init() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js не загружен!');
        document.getElementById('loading').textContent = 'Ошибка загрузки библиотек';
        return;
    }

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050510);
    scene.fog = new THREE.Fog(0x050510, 10, 50);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 8);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 0.3;
    controls.maxDistance = 15;
    // Отключаем панорамирование правой кнопкой мыши
    controls.enablePan = false;
    // Отключаем управление во время начальной анимации
    controls.enabled = false;

    // Raycaster for interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Lighting
    setupLighting();

    // Create room
    createRoom();

    // Create glass table
    createGlassTable();

    // Create monitor and keyboard
    createMonitor();
    createKeyboard();

    // Create PC case
    createPCCase();

    // Create components
    createMotherboard();
    createCPU();
    createRAM();
    createGPU();
    createPSU();
    createStorage();
    // createCables(); // Провода удалены
    createCaseFans();

    // Create dust particles
    createDustParticles();

    // Post-processing (optional, can be enabled later)
    // setupPostProcessing();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    
    // Event listeners for mouse interaction
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
    
    document.getElementById('close-btn').addEventListener('click', closeInfoPanel);

    // Start camera animation
    startCameraAnimation();

    // Hide loading
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1000);

    animate();
}

// Setup lighting
function setupLighting() {
    // Ambient light - увеличиваем для лучшей видимости
    const ambientLight = new THREE.AmbientLight(0x001133, 0.5);
    scene.add(ambientLight);

    // Main neon light над столом (cyan) - основной источник света
    const neonLight = new THREE.PointLight(0x00ffff, 3, 25);
    neonLight.position.set(0, 1.5, 0);
    neonLight.castShadow = true;
    scene.add(neonLight);

    // Дополнительный свет внутри корпуса ПК
    const pcInternalLight = new THREE.PointLight(0x00ffff, 2.5, 8);
    pcInternalLight.position.set(0, 1.15, 0);
    scene.add(pcInternalLight);

    // Свет от RGB компонентов (имитация)
    const rgbLight1 = new THREE.PointLight(0x00ffff, 1.5, 6);
    rgbLight1.position.set(0, 1.2, 0.05);
    scene.add(rgbLight1);

    const rgbLight2 = new THREE.PointLight(0x00ffff, 1.2, 6);
    rgbLight2.position.set(-0.1, 1.1, -0.08);
    scene.add(rgbLight2);

    // Дополнительные акцентные огни
    const accentLight1 = new THREE.PointLight(0x00ffff, 1.2, 15);
    accentLight1.position.set(-2, 1.2, -2);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x0088ff, 1, 15);
    accentLight2.position.set(2, 1.2, -2);
    scene.add(accentLight2);

    // Directional light для теней и общего освещения
    const dirLight = new THREE.DirectionalLight(0x00aaff, 0.8);
    dirLight.position.set(3, 8, 3);
    dirLight.castShadow = true;
    dirLight.shadow.camera.left = -5;
    dirLight.shadow.camera.right = 5;
    dirLight.shadow.camera.top = 5;
    dirLight.shadow.camera.bottom = -5;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    // Дополнительный направленный свет для подсветки компонентов
    const fillLight = new THREE.DirectionalLight(0x0066aa, 0.4);
    fillLight.position.set(-2, 4, 2);
    scene.add(fillLight);
}

// Create room
function createRoom() {
    const roomSize = 15;
    const roomHeight = 8;

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a15,
        roughness: 0.8,
        metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x050510,
        roughness: 0.9,
        metalness: 0.05
    });

    // Back wall
    const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomSize, roomHeight),
        wallMaterial
    );
    backWall.position.z = -roomSize / 2;
    backWall.position.y = roomHeight / 2;
    scene.add(backWall);

    // Side walls
    const leftWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomSize, roomHeight),
        wallMaterial
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -roomSize / 2;
    leftWall.position.y = roomHeight / 2;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomSize, roomHeight),
        wallMaterial
    );
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = roomSize / 2;
    rightWall.position.y = roomHeight / 2;
    scene.add(rightWall);

    // Ceiling
    const ceiling = new THREE.Mesh(
        new THREE.PlaneGeometry(roomSize, roomSize),
        wallMaterial
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = roomHeight;
    scene.add(ceiling);

    // Neon grid on floor
    const gridHelper = new THREE.GridHelper(roomSize, 20, 0x00ffff, 0x003333);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);
}

// Create glass table
function createGlassTable() {
    const tableGroup = new THREE.Group();

    // Table top (glass)
    const tableTopGeometry = new THREE.BoxGeometry(3, 0.05, 1.5);
    const tableTopMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.9
    });
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.position.y = 0.8;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Neon edges
    const edgeGeometry = new THREE.BoxGeometry(3.1, 0.02, 0.02);
    const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 2
    });

    // Top edges
    const topEdge1 = new THREE.Mesh(edgeGeometry, edgeMaterial);
    topEdge1.position.set(0, 0.825, 0.75);
    tableGroup.add(topEdge1);

    const topEdge2 = new THREE.Mesh(edgeGeometry, edgeMaterial);
    topEdge2.position.set(0, 0.825, -0.75);
    tableGroup.add(topEdge2);

    const sideEdge1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.02, 1.5),
        edgeMaterial
    );
    sideEdge1.position.set(1.55, 0.825, 0);
    tableGroup.add(sideEdge1);

    const sideEdge2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.02, 1.5),
        edgeMaterial
    );
    sideEdge2.position.set(-1.55, 0.825, 0);
    tableGroup.add(sideEdge2);

    // Table legs
    const legGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.1);
    const legMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.3,
        metalness: 0.7
    });

    const positions = [
        [1.4, 0.4, 0.7],
        [-1.4, 0.4, 0.7],
        [1.4, 0.4, -0.7],
        [-1.4, 0.4, -0.7]
    ];

    positions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(...pos);
        leg.castShadow = true;
        tableGroup.add(leg);
    });

    scene.add(tableGroup);
}

// Create monitor
function createMonitor() {
    const monitorGroup = new THREE.Group();

    // Monitor stand base (шире)
    const standBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.02, 0.25),
        new THREE.MeshStandardMaterial({
            color: 0x1a1a2e,
            roughness: 0.3,
            metalness: 0.7
        })
    );
    standBase.position.set(-0.6, 0.8, -0.3);
    monitorGroup.add(standBase);

    // Monitor stand
    const stand = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.15, 0.05),
        new THREE.MeshStandardMaterial({
            color: 0x1a1a2e,
            roughness: 0.3,
            metalness: 0.7
        })
    );
    stand.position.set(-0.6, 0.875, -0.3);
    monitorGroup.add(stand);

    // Monitor back panel (шире)
    const backPanel = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.4, 0.05),
        new THREE.MeshStandardMaterial({
            color: 0x0a0a15,
            roughness: 0.4,
            metalness: 0.6
        })
    );
    backPanel.position.set(-0.6, 1.05, -0.3);
    monitorGroup.add(backPanel);

    // Monitor screen (main body) - шире
    const screenBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.38, 0.03),
        new THREE.MeshStandardMaterial({
            color: 0x1a1a2e,
            roughness: 0.2,
            metalness: 0.8
        })
    );
    screenBody.position.set(-0.6, 1.05, -0.28);
    monitorGroup.add(screenBody);

    // Screen bezel (frame) - шире
    const bezel = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.4, 0.02),
        new THREE.MeshStandardMaterial({
            color: 0x0a0a15,
            roughness: 0.3,
            metalness: 0.7
        })
    );
    bezel.position.set(-0.6, 1.05, -0.27);
    monitorGroup.add(bezel);

    // Screen display (glowing) - шире, с текстурами/паттерном
    const displayGeometry = new THREE.PlaneGeometry(0.65, 0.35);
    const displayMaterial = new THREE.MeshStandardMaterial({
        color: 0x001122,
        emissive: 0x003366,
        emissiveIntensity: 0.8
    });
    
    // Создаем текстуру с паттерном (имитация изображения на экране)
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Градиент фон
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#001122');
    gradient.addColorStop(0.5, '#003366');
    gradient.addColorStop(1, '#001133');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Добавляем паттерн (сетка/код)
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 25, 0);
        ctx.lineTo(i * 25, 512);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * 25);
        ctx.lineTo(512, i * 25);
        ctx.stroke();
    }
    
    // Добавляем текст/символы
    ctx.fillStyle = '#00ffff';
    ctx.font = '20px monospace';
    ctx.fillText('SYSTEM ONLINE', 50, 100);
    ctx.fillText('> INITIALIZING...', 50, 150);
    ctx.fillText('> COMPONENTS OK', 50, 200);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    displayMaterial.map = texture;
    displayMaterial.emissiveMap = texture;
    
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.rotation.y = Math.PI;
    display.position.set(-0.6, 1.05, -0.26);
    monitorGroup.add(display);

    // RGB accent strips on monitor (шире)
    const rgbStrip1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.01, 0.001),
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 1.5
        })
    );
    rgbStrip1.position.set(-0.6, 1.24, -0.27);
    monitorGroup.add(rgbStrip1);

    const rgbStrip2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.01, 0.001),
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 1.5
        })
    );
    rgbStrip2.position.set(-0.6, 0.86, -0.27);
    monitorGroup.add(rgbStrip2);

    // Monitor logo/brand (decorative)
    const logo = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.02, 0.01),
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.8
        })
    );
    logo.position.set(-0.6, 0.85, -0.27);
    monitorGroup.add(logo);

    scene.add(monitorGroup);
}

// Create keyboard
function createKeyboard() {
    const keyboardGroup = new THREE.Group();

    // Keyboard base
    const keyboardBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.02, 0.15),
        new THREE.MeshStandardMaterial({
            color: 0x0a0a15,
            roughness: 0.4,
            metalness: 0.6
        })
    );
    keyboardBase.position.set(-0.5, 0.81, 0.25);
    keyboardGroup.add(keyboardBase);

    // Keyboard keys area
    const keysArea = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.015, 0.13),
        new THREE.MeshStandardMaterial({
            color: 0x1a1a2e,
            roughness: 0.3,
            metalness: 0.5
        })
    );
    keysArea.position.set(-0.5, 0.817, 0.25);
    keyboardGroup.add(keysArea);

    // Individual keys
    const keyMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a3e,
        roughness: 0.2,
        metalness: 0.3
    });

    // Function keys row - точно над клавиатурой
    // Клавиатура: позиция -0.5, 0.81, 0.25, размер 0.4x0.15
    // Клавиши должны быть от -0.7 до -0.3 по X, от 0.18 до 0.32 по Z
    for (let i = 0; i < 12; i++) {
        const key = new THREE.Mesh(
            new THREE.BoxGeometry(0.025, 0.01, 0.025),
            keyMaterial
        );
        // Центрируем функциональные клавиши на клавиатуре
        key.position.set(-0.5 - 0.15 + i * 0.027, 0.825, 0.32);
        keyboardGroup.add(key);
    }

    // Main keys (QWERTY layout) - точно над клавиатурой
    const rows = [
        { start: -0.65, y: 0.825, z: 0.28, count: 13, offset: 0 },
        { start: -0.64, y: 0.825, z: 0.25, count: 12, offset: 0.015 },
        { start: -0.63, y: 0.825, z: 0.22, count: 11, offset: 0.03 },
        { start: -0.62, y: 0.825, z: 0.19, count: 10, offset: 0.045 }
    ];

    rows.forEach(row => {
        for (let i = 0; i < row.count; i++) {
            const key = new THREE.Mesh(
                new THREE.BoxGeometry(0.025, 0.01, 0.025),
                keyMaterial
            );
            key.position.set(row.start + i * 0.027 + row.offset, row.y, row.z);
            keyboardGroup.add(key);
        }
    });

    // Spacebar (larger key) - точно над клавиатурой
    const spacebar = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.01, 0.025),
        keyMaterial
    );
    spacebar.position.set(-0.5, 0.825, 0.16);
    keyboardGroup.add(spacebar);

    // RGB backlight strip
    const rgbBacklight = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.001, 0.13),
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 1.2
        })
    );
    rgbBacklight.position.set(-0.5, 0.815, 0.25);
    keyboardGroup.add(rgbBacklight);

    // Keyboard cable - идет к задней панели системного блока
    // После поворота на 90° задняя панель теперь на x = -0.2 (было z = -0.2)
    const keyboardCable = createCablePath([
        new THREE.Vector3(-0.5, 0.81, 0.25),
        new THREE.Vector3(-0.5, 0.81, 0.05),
        new THREE.Vector3(-0.2, 0.81, 0.05),
        new THREE.Vector3(-0.2, 0.25, 0.05),
        new THREE.Vector3(-0.2, 0.25, 0)
    ], 0.003, 0x1a1a1a);
    keyboardGroup.add(keyboardCable);

    // Mouse cable - идет к задней панели системного блока
    const mouseCable = createCablePath([
        new THREE.Vector3(-0.4, 0.81, 0.25),
        new THREE.Vector3(-0.4, 0.81, 0.05),
        new THREE.Vector3(-0.15, 0.81, 0.05),
        new THREE.Vector3(-0.15, 0.3, 0.05),
        new THREE.Vector3(-0.2, 0.3, 0)
    ], 0.002, 0x1a1a1a);
    keyboardGroup.add(mouseCable);

    scene.add(keyboardGroup);
}

// Create PC case
function createPCCase() {
    pcCase = new THREE.Group();

    // Case dimensions
    const width = 0.5;
    const height = 0.6;
    const depth = 0.4;

    // Case material
    const caseMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.4,
        metalness: 0.8
    });

    // Back panel - удалена
    // USB ports - удалены

    // Top panel
    const topPanel = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.02, depth),
        caseMaterial
    );
    topPanel.position.set(0, height, 0);
    pcCase.add(topPanel);

    // Bottom panel
    const bottomPanel = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.02, depth),
        caseMaterial
    );
    bottomPanel.position.set(0, 0, 0);
    pcCase.add(bottomPanel);

    // Left panel - удалена

    // Right panel (возвращаем правую стенку - здесь будет материнская плата)
    const rightPanel = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, height, depth),
        caseMaterial
    );
    rightPanel.position.set(width / 2, height / 2, 0);
    pcCase.add(rightPanel);

    // Front panel (возвращаем переднюю стенку)
    const frontPanel = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, 0.02),
        caseMaterial
    );
    frontPanel.position.set(0, height / 2, depth / 2);
    pcCase.add(frontPanel);

    // Position case on table
    pcCase.position.set(0, 0.85, 0);
    // Поворачиваем системный блок на 90 градусов, чтобы открытая сторона смотрела в сторону камеры
    pcCase.rotation.y = Math.PI / 2;
    scene.add(pcCase);
}

// Create motherboard
function createMotherboard() {
    motherboard = new THREE.Group();

    const mbWidth = 0.3;
    const mbHeight = 0.24;
    const mbThickness = 0.01; // Увеличена толщина, чтобы плата была видна

    // Main PCB - вертикально, прикреплена к правой стенке
    const pcbGeometry = new THREE.BoxGeometry(mbThickness, mbHeight, mbWidth);
    const pcbMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d5016,
        roughness: 0.7,
        metalness: 0.1
    });
    const pcb = new THREE.Mesh(pcbGeometry, pcbMaterial);
    // Плата прикреплена к правой стенке, центр платы на стенке
    pcb.position.x = 0;
    motherboard.add(pcb);

    // PCB traces (decorative lines) - вертикально
    const traceMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a7c2a,
        emissive: 0x2a5a1a,
        emissiveIntensity: 0.3
    });

    for (let i = 0; i < 20; i++) {
        const trace = new THREE.Mesh(
            new THREE.BoxGeometry(0.001, 0.15, 0.002),
            traceMaterial
        );
        trace.position.set(
            mbThickness / 2 + 0.001,
            (Math.random() - 0.5) * mbHeight * 0.8,
            (Math.random() - 0.5) * mbWidth * 0.8
        );
        trace.rotation.x = Math.random() * Math.PI * 2;
        motherboard.add(trace);
    }

    // CPU Socket - вертикально
    const socketGeometry = new THREE.BoxGeometry(0.01, 0.05, 0.05);
    const socketMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.5,
        metalness: 0.3
    });
    const socket = new THREE.Mesh(socketGeometry, socketMaterial);
    socket.position.set(mbThickness / 2 + 0.005, 0.05, 0.05);
    motherboard.add(socket);

    // PCI-E slots - вертикально, правильно размещены на плате
    for (let i = 0; i < 3; i++) {
        const pcieSlot = new THREE.Mesh(
            new THREE.BoxGeometry(0.01, 0.08, 0.002),
            new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
        );
        // Слоты расположены в верхней части платы, по центру по Z
        pcieSlot.position.set(mbThickness / 2 + 0.005, 0.08, -0.03 + i * 0.03);
        motherboard.add(pcieSlot);
    }

    // DIMM slots - вертикально, правильно размещены на плате
    for (let i = 0; i < 4; i++) {
        const dimmSlot = new THREE.Mesh(
            new THREE.BoxGeometry(0.01, 0.12, 0.002),
            new THREE.MeshStandardMaterial({ color: 0x2a2a2a })
        );
        // Слоты расположены в нижней части платы, равномерно по Z
        dimmSlot.position.set(mbThickness / 2 + 0.005, -0.1, -0.075 + i * 0.05);
        motherboard.add(dimmSlot);
    }

    // M.2 slot - вертикально
    const m2Slot = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 0.08, 0.002),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
    );
    m2Slot.position.set(mbThickness / 2 + 0.005, -0.05, 0.08);
    motherboard.add(m2Slot);

    // Chipset with heatsink - вертикально
    const chipsetGeometry = new THREE.BoxGeometry(0.015, 0.03, 0.03);
    const chipsetMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.3,
        metalness: 0.7
    });
    const chipset = new THREE.Mesh(chipsetGeometry, chipsetMaterial);
    chipset.position.set(mbThickness / 2 + 0.0075, -0.1, 0.05);
    motherboard.add(chipset);

    // SATA connectors - вертикально
    for (let i = 0; i < 4; i++) {
        const sataConnector = new THREE.Mesh(
            new THREE.BoxGeometry(0.01, 0.015, 0.01),
            new THREE.MeshStandardMaterial({ color: 0x333333 })
        );
        sataConnector.position.set(mbThickness / 2 + 0.005, 0.12, -0.06 + i * 0.04);
        motherboard.add(sataConnector);
    }

    // 24-pin connector - вертикально
    const power24Pin = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 0.02, 0.04),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
    );
    power24Pin.position.set(mbThickness / 2 + 0.005, 0.13, 0.08);
    motherboard.add(power24Pin);

    // Материнская плата прикреплена к правой стенке корпуса
    // Размеры корпуса (те же, что в createPCCase)
    const caseWidth = 0.5;
    const caseHeight = 0.6;
    const caseDepth = 0.4;
    // Позиция: правая стенка на x = caseWidth/2 = 0.25, толщина стенки = 0.02
    // Внутренняя поверхность стенки: x = 0.25 - 0.02 = 0.23
    // Плата прижата к внутренней поверхности стенки, центр платы по X: 0.23 - mbThickness/2 = 0.23 - 0.005 = 0.225
    // Центрирована по высоте и глубине, чтобы все компоненты помещались
    // mbWidth = 0.3, поэтому центрируем по Z: от -0.15 до +0.15
    motherboard.position.set(caseWidth / 2 - 0.02 - mbThickness / 2, caseHeight / 2, 0);
    motherboard.userData = { type: 'motherboard', name: 'motherboard' };
    pcCase.add(motherboard);
}

// Create CPU
function createCPU() {
    cpu = new THREE.Group();

    // CPU die
    const cpuGeometry = new THREE.BoxGeometry(0.04, 0.005, 0.04);
    const cpuMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.2,
        metalness: 0.8
    });
    const cpuDie = new THREE.Mesh(cpuGeometry, cpuMaterial);
    cpuDie.position.y = 0.01;
    cpu.add(cpuDie);

    // CPU pins (visual representation)
    const pinGeometry = new THREE.BoxGeometry(0.001, 0.01, 0.001);
    const pinMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    for (let i = 0; i < 20; i++) {
        const pin = new THREE.Mesh(pinGeometry, pinMaterial);
        pin.position.set(
            (Math.random() - 0.5) * 0.03,
            0.005,
            (Math.random() - 0.5) * 0.03
        );
        cpu.add(pin);
    }

    // CPU cooler
    const coolerBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.01, 0.05),
        new THREE.MeshStandardMaterial({
            color: 0x333333,
            roughness: 0.3,
            metalness: 0.7
        })
    );
    coolerBase.position.y = 0.025;
    cpu.add(coolerBase);

    // Heat pipes
    for (let i = 0; i < 4; i++) {
        const heatPipe = new THREE.Mesh(
            new THREE.CylinderGeometry(0.002, 0.002, 0.03, 8),
            new THREE.MeshStandardMaterial({
                color: 0x444444,
                roughness: 0.2,
                metalness: 0.9
            })
        );
        heatPipe.rotation.x = Math.PI / 2;
        heatPipe.position.set(
            (i % 2 - 0.5) * 0.015,
            0.04,
            (Math.floor(i / 2) - 0.5) * 0.015
        );
        cpu.add(heatPipe);
    }

    // Fan
    const fanGroup = new THREE.Group();
    const fanHousing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.005, 32),
        new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.5,
            metalness: 0.3
        })
    );
    fanHousing.rotation.x = Math.PI / 2;
    fanHousing.position.y = 0.055;
    fanGroup.add(fanHousing);

    // Fan blades
    const bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        emissive: 0x00ffff,
        emissiveIntensity: 0.3
    });
    for (let i = 0; i < 7; i++) {
        const blade = new THREE.Mesh(
            new THREE.BoxGeometry(0.015, 0.001, 0.008),
            bladeMaterial
        );
        blade.rotation.z = (i / 7) * Math.PI * 2;
        blade.position.y = 0.055;
        fanGroup.add(blade);
    }
    cpu.add(fanGroup);

    // RGB ring
    const rgbRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.022, 0.002, 16, 32),
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 1
        })
    );
    rgbRing.rotation.x = Math.PI / 2;
    rgbRing.position.y = 0.055;
    cpu.add(rgbRing);

    // CPU на материнской плате (вертикально на правой стенке)
    // Размеры корпуса
    const caseWidth = 0.5;
    const caseHeight = 0.6;
    // Позиция: материнская плата на x = caseWidth/2 - 0.02 - mbThickness/2 = 0.225
    // CPU должен быть на поверхности платы (правая сторона платы, где сокет)
    // Сокет CPU на плате имеет позицию x = mbThickness/2 + 0.005 = 0.01 относительно группы платы
    // Реальная позиция CPU: x = 0.225 + 0.01 = 0.235
    const mbThickness = 0.01;
    cpu.position.set(caseWidth / 2 - 0.02 - mbThickness / 2 + 0.01, caseHeight / 2 + 0.05, 0.05);
    cpu.rotation.x = -Math.PI / 2; // Поворачиваем CPU для вертикальной платы
    cpu.userData = { type: 'cpu', name: 'cpu' };
    pcCase.add(cpu);

    // Animate fan
    function animateFan() {
        fanGroup.rotation.z += 0.1;
        requestAnimationFrame(animateFan);
    }
    animateFan();
}

// Create RAM
function createRAM() {
    ram = new THREE.Group();

    for (let i = 0; i < 4; i++) {
        const ramStick = new THREE.Group();

        // RAM PCB - уменьшен размер, чтобы не выходила за границы
        const ramPCB = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.03, 0.002),
            new THREE.MeshStandardMaterial({
                color: 0x2d5016,
                roughness: 0.7,
                metalness: 0.1
            })
        );
        ramStick.add(ramPCB);

        // RAM chips
        for (let j = 0; j < 4; j++) {
            const chip = new THREE.Mesh(
                new THREE.BoxGeometry(0.015, 0.02, 0.003),
                new THREE.MeshStandardMaterial({
                    color: 0x1a1a1a,
                    roughness: 0.5,
                    metalness: 0.2
                })
            );
            chip.position.set(-0.04 + j * 0.025, 0, 0.0025);
            ramStick.add(chip);
        }

        // RGB strip - уменьшен размер
        const rgbStrip = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.005, 0.001),
            new THREE.MeshStandardMaterial({
                color: 0x00ffff,
                emissive: 0x00ffff,
                emissiveIntensity: 1.5
            })
        );
        rgbStrip.position.set(0, 0.015, 0.003);
        ramStick.add(rgbStrip);

        // RAM на материнской плате (вертикально на правой стенке)
        const caseWidth = 0.5;
        const caseHeight = 0.6;
        // RAM должна быть на поверхности материнской платы
        // Материнская плата на x = caseWidth/2 - 0.02 - mbThickness/2 = 0.225
        // RAM слоты на плате в нижней части (y = -0.1 относительно центра платы)
        // RAM должна быть на поверхности платы: x = 0.225 + mbThickness/2 = 0.23
        // z от -0.1 до 0.05 (4 планки с шагом 0.05, в пределах mbWidth=0.3)
        const mbThickness = 0.01;
        ramStick.position.set(caseWidth / 2 - 0.02, caseHeight / 2 - 0.1, -0.1 + i * 0.05);
        ramStick.rotation.x = -Math.PI / 2; // Поворачиваем для вертикальной платы
        ramStick.userData = { type: 'ram', name: 'ram' };
        ram.add(ramStick);
    }

    pcCase.add(ram);
}

// Create GPU
function createGPU() {
    gpu = new THREE.Group();

    // GPU PCB - правильно размещена, чтобы не выходила за границы
    // Корпус: width=0.5 (X: -0.25 до 0.25), правая стенка на x=0.25
    // GPU повернута на -Math.PI/2 вокруг X
    // GPU позиция: x=0.245, поэтому максимальный размер по X = 0.25 - 0.245 = 0.005
    // Но это слишком мало, поэтому уменьшаем GPU и сдвигаем её немного влево
    // GPU PCB: уменьшена до 0.1 по X (после поворота), чтобы не выходила за x=0.25
    const gpuPCB = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.12, 0.005),
        new THREE.MeshStandardMaterial({
            color: 0x2d5016,
            roughness: 0.7,
            metalness: 0.1
        })
    );
    gpuPCB.position.y = 0.005;
    gpu.add(gpuPCB);

    // GPU die
    const gpuDie = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.03, 0.01),
        new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.2,
            metalness: 0.8
        })
    );
    gpuDie.position.set(0, 0.01, 0.01);
    gpu.add(gpuDie);

    // VRAM chips
    for (let i = 0; i < 8; i++) {
        const vramChip = new THREE.Mesh(
            new THREE.BoxGeometry(0.01, 0.01, 0.005),
            new THREE.MeshStandardMaterial({
                color: 0x2a2a2a,
                roughness: 0.3,
                metalness: 0.6
            })
        );
        vramChip.position.set(
            -0.08 + (i % 4) * 0.05,
            0.01,
            0.01
        );
        gpu.add(vramChip);
    }

    // Heatsink - правильно размещен, чтобы не выходил за границы
    // Уменьшен по X, чтобы не выходил за x=0.25
    const heatsink = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 0.04),
        new THREE.MeshStandardMaterial({
            color: 0x444444,
            roughness: 0.3,
            metalness: 0.7
        })
    );
    heatsink.position.set(0, 0.05, 0.02);
    gpu.add(heatsink);

    // Heat fins - правильно размещены
    for (let i = 0; i < 20; i++) {
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(0.07, 0.06, 0.001),
            new THREE.MeshStandardMaterial({
                color: 0x555555,
                roughness: 0.2,
                metalness: 0.8
            })
        );
        fin.position.set(0, 0.05, 0.02 + (i - 10) * 0.003);
        gpu.add(fin);
    }

    // Fans
    for (let f = 0; f < 3; f++) {
        const fanGroup = new THREE.Group();
        const fanHousing = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.01, 32),
            new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                roughness: 0.5,
                metalness: 0.3
            })
        );
        fanHousing.rotation.x = Math.PI / 2;
        fanGroup.add(fanHousing);

        // Fan blades
        for (let i = 0; i < 9; i++) {
            const blade = new THREE.Mesh(
                new THREE.BoxGeometry(0.025, 0.001, 0.01),
                new THREE.MeshStandardMaterial({
                    color: 0x2a2a2a,
                    emissive: 0x00ffff,
                    emissiveIntensity: 0.2
                })
            );
            blade.rotation.z = (i / 9) * Math.PI * 2;
            fanGroup.add(blade);
        }

        // Вентиляторы GPU - правильно размещены
        fanGroup.position.set(-0.04 + f * 0.04, 0.05, 0.04);
        fanGroup.rotation.x = Math.PI / 2;
        gpu.add(fanGroup);

        // Animate fan
        (function(fan) {
            function animate() {
                fan.rotation.z += 0.15;
                requestAnimationFrame(animate);
            }
            animate();
        })(fanGroup);
    }

    // PCI-E connector
    const pcieConnector = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.01, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
    );
    pcieConnector.position.set(0, -0.05, 0);
    gpu.add(pcieConnector);

    // GPU в слоте PCI-E на материнской плате (вертикально на правой стенке)
    // Размеры корпуса
    const caseWidth = 0.5;
    const caseHeight = 0.6;
    // GPU должна быть на поверхности материнской платы
    // Материнская плата на x = caseWidth/2 - 0.02 - mbThickness/2 = 0.225
    // GPU должна быть в среднем слоте PCI-E (i=1), который находится на z = 0
    // GPU на поверхности платы: x = 0.225 + mbThickness/2 = 0.23
    // GPU PCB: 0.1 x 0.12 x 0.005, не выходит за внутреннюю поверхность стенки (x=0.23)
    const mbThickness = 0.01;
    gpu.position.set(caseWidth / 2 - 0.02, caseHeight / 2 + 0.08, 0);
    gpu.rotation.x = -Math.PI / 2; // Поворачиваем для вертикальной платы
    gpu.userData = { type: 'gpu', name: 'gpu' };
    pcCase.add(gpu);
}

// Create PSU
function createPSU() {
    psu = new THREE.Group();

    // PSU case
    const psuCase = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.08, 0.15),
        new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.4,
            metalness: 0.6
        })
    );
    psu.add(psuCase);

    // Fan grill
    const fanGrill = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.01, 32),
        new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            roughness: 0.5,
            metalness: 0.5
        })
    );
    fanGrill.rotation.x = Math.PI / 2;
    fanGrill.position.set(0, 0, -0.08);
    psu.add(fanGrill);

    // Capacitors
    for (let i = 0; i < 6; i++) {
        const capacitor = new THREE.Mesh(
            new THREE.CylinderGeometry(0.005, 0.005, 0.02, 16),
            new THREE.MeshStandardMaterial({
                color: 0x2a2a2a,
                roughness: 0.3,
                metalness: 0.7
            })
        );
        capacitor.position.set(
            -0.04 + (i % 3) * 0.04,
            0.01,
            -0.03 + Math.floor(i / 3) * 0.03
        );
        psu.add(capacitor);
    }

    // Transformer
    const transformer = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.03, 0.04),
        new THREE.MeshStandardMaterial({
            color: 0x333333,
            roughness: 0.4,
            metalness: 0.5
        })
    );
    transformer.position.set(0.04, 0.01, 0.02);
    psu.add(transformer);

    // Cables output
    const cableOutput = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.03, 0.01),
        new THREE.MeshStandardMaterial({ color: 0x0a0a0a })
    );
    cableOutput.position.set(0, 0, 0.08);
    psu.add(cableOutput);

    // PSU в нижнем левом углу - правильно размещен внутри корпуса
    // PSU размером 0.14 x 0.08 x 0.15
    // Корпус: width=0.5 (X: -0.25 до 0.25), depth=0.4 (Z: -0.2 до 0.2)
    psu.position.set(-0.18, 0.04, 0.05);
    psu.userData = { type: 'psu', name: 'psu' };
    pcCase.add(psu);
}

// Create storage
function createStorage() {
    // SSD (2.5")
    ssd = new THREE.Group();
    const ssdCase = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.01, 0.1),
        new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.3,
            metalness: 0.7
        })
    );
    ssd.add(ssdCase);

    // SSD label
    const ssdLabel = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.011, 0.09),
        new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.5,
            metalness: 0.3
        })
    );
    ssd.add(ssdLabel);

    // SSD правильно размещен внутри корпуса
    // SSD размером 0.07 x 0.01 x 0.1
    ssd.position.set(0.12, 0.12, 0.05);
    ssd.userData = { type: 'ssd', name: 'ssd' };
    pcCase.add(ssd);

    // HDD (3.5")
    hdd = new THREE.Group();
    const hddCase = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.025, 0.15),
        new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.3,
            metalness: 0.7
        })
    );
    hdd.add(hddCase);

    // HDD label
    const hddLabel = new THREE.Mesh(
        new THREE.BoxGeometry(0.09, 0.026, 0.14),
        new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.5,
            metalness: 0.3
        })
    );
    hdd.add(hddLabel);

    // SATA connectors
    const sataConnector = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.01, 0.01),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    sataConnector.position.set(0.06, 0, 0);
    hdd.add(sataConnector);

    // HDD правильно размещен внутри корпуса
    // HDD размером 0.1 x 0.025 x 0.15
    hdd.position.set(0.12, 0.08, -0.1);
    hdd.userData = { type: 'hdd', name: 'hdd' };
    pcCase.add(hdd);
}

// Create cables
function createCables() {
    cables = new THREE.Group();
    
    // Размеры корпуса (те же, что в createPCCase)
    const caseWidth = 0.5;
    const caseHeight = 0.6;
    const caseDepth = 0.4;

    // 24-pin cable - от материнской платы к PSU (вертикально на правой стенке)
    const cable24Pin = createCablePath([
        new THREE.Vector3(caseWidth / 2 - 0.005, caseHeight / 2 + 0.13, 0.08),
        new THREE.Vector3(caseWidth / 2 - 0.1, caseHeight / 2 + 0.13, 0.08),
        new THREE.Vector3(-0.18, caseHeight / 2 + 0.13, 0.1),
        new THREE.Vector3(-0.18, 0.08, 0.1)
    ], 0.003, 0x1a1a1a);
    cables.add(cable24Pin);

    // SATA cables - от материнской платы к накопителям (вертикально на правой стенке)
    for (let i = 0; i < 2; i++) {
        const sataCable = createCablePath([
            new THREE.Vector3(caseWidth / 2 - 0.005, caseHeight / 2 + 0.12, -0.06 + i * 0.04),
            new THREE.Vector3(caseWidth / 2 - 0.05, caseHeight / 2 + 0.12, -0.06 + i * 0.04),
            new THREE.Vector3(0.12, caseHeight / 2 + 0.12, i === 0 ? 0.08 : -0.1),
            new THREE.Vector3(0.12, i === 0 ? 0.12 : 0.08, i === 0 ? 0.08 : -0.1)
        ], 0.002, 0x333333);
        cables.add(sataCable);
    }

    // CPU power cable - от материнской платы к PSU (вертикально на правой стенке)
    const cpuCable = createCablePath([
        new THREE.Vector3(caseWidth / 2 - 0.005, caseHeight / 2 + 0.05, 0.05),
        new THREE.Vector3(caseWidth / 2 - 0.1, caseHeight / 2 + 0.05, 0.05),
        new THREE.Vector3(-0.18, caseHeight / 2 + 0.05, 0.1),
        new THREE.Vector3(-0.18, 0.1, 0.1)
    ], 0.002, 0x1a1a1a);
    cables.add(cpuCable);

    pcCase.add(cables);
}

function createCablePath(points, radius, color) {
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 20, radius, 8, false);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.8,
        metalness: 0.1
    });
    return new THREE.Mesh(geometry, material);
}

// Create case fans
function createCaseFans() {
    fans = new THREE.Group();

    // Вентиляторы корпуса - правильно размещены внутри корпуса
    // Корпус: width=0.5 (X: -0.25 до 0.25), height=0.6 (Y: 0 до 0.6), depth=0.4 (Z: -0.2 до 0.2)
    const fanPositions = [
        { pos: [0.15, 0.3, 0.15], rot: [0, 0, 0] }, // Front top - сдвинут влево
        { pos: [0.15, 0.15, 0.15], rot: [0, 0, 0] }, // Front bottom - сдвинут влево
        { pos: [0, 0.3, -0.15], rot: [0, Math.PI, 0] } // Back - исправлен Z
    ];

    fanPositions.forEach((fanData, index) => {
        const fanGroup = new THREE.Group();

        // Fan housing - более реалистичный
        const fanHousing = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.04, 0.015, 32),
            new THREE.MeshStandardMaterial({
                color: 0x2a2a2a,
                roughness: 0.6,
                metalness: 0.4
            })
        );
        fanHousing.rotation.x = Math.PI / 2;
        fanGroup.add(fanHousing);

        // Центральная ступица вентилятора
        const hub = new THREE.Mesh(
            new THREE.CylinderGeometry(0.008, 0.008, 0.002, 16),
            new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                roughness: 0.5,
                metalness: 0.5
            })
        );
        hub.rotation.x = Math.PI / 2;
        fanGroup.add(hub);

        // Fan blades - реалистичные, правильно расположенные
        const bladeMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a3a3a,
            roughness: 0.7,
            metalness: 0.2
        });
        for (let i = 0; i < 7; i++) {
            // Реалистичная форма лопасти - изогнутая
            const blade = new THREE.Mesh(
                new THREE.BoxGeometry(0.032, 0.0015, 0.01),
                bladeMaterial
            );
            const angle = (i / 7) * Math.PI * 2;
            blade.rotation.z = angle;
            // Изгиб лопасти для реалистичности
            blade.rotation.y = Math.sin(angle) * 0.15;
            blade.position.y = 0;
            fanGroup.add(blade);
        }

        // Минимальная RGB подсветка (опционально, только для некоторых вентиляторов)
        if (index === 0) { // Только для первого вентилятора
            const rgbRing = new THREE.Mesh(
                new THREE.TorusGeometry(0.041, 0.001, 8, 32),
                new THREE.MeshStandardMaterial({
                    color: 0x00ffff,
                    emissive: 0x00ffff,
                    emissiveIntensity: 0.5
                })
            );
            rgbRing.rotation.x = Math.PI / 2;
            fanGroup.add(rgbRing);
        }

        fanGroup.position.set(...fanData.pos);
        fanGroup.rotation.set(...fanData.rot);
        fanGroup.userData = { type: 'fan', name: 'fan' };
        fans.add(fanGroup);

        // Animate fan
        (function(fan) {
            function animate() {
                fan.rotation.z += 0.12;
                requestAnimationFrame(animate);
            }
            animate();
        })(fanGroup);
    });

    pcCase.add(fans);
}

// Create dust particles
function createDustParticles() {
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = Math.random() * 8;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        velocities[i] = (Math.random() - 0.5) * 0.01;
        velocities[i + 1] = Math.random() * 0.005;
        velocities[i + 2] = (Math.random() - 0.5) * 0.01;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.userData.velocities = velocities;

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });

    dustParticles = new THREE.Points(geometry, material);
    scene.add(dustParticles);
}

// Setup post-processing
function setupPostProcessing() {
    try {
        const renderTarget = new THREE.WebGLRenderTarget(
            window.innerWidth,
            window.innerHeight,
            {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat
            }
        );

        composer = new THREE.EffectComposer(renderer, renderTarget);

        const renderPass = new THREE.RenderPass(scene, camera);
        composer.addPass(renderPass);

        // Bloom pass
        if (typeof THREE.UnrealBloomPass !== 'undefined') {
            const bloomPass = new THREE.UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                1.5,
                0.4,
                0.85
            );
            composer.addPass(bloomPass);
        }
    } catch (error) {
        console.warn('Post-processing не доступен, используем обычный рендеринг:', error);
        composer = null;
    }
}

// Camera animation
let cameraAnimationActive = false;
let animationCompleted = false;

function startCameraAnimation() {
    const totalDuration = 6000; // 6 seconds - общая длительность
    const startTime = Date.now();
    cameraAnimationActive = true;

    // Этап 1: Начальная позиция (обзор комнаты)
    const startPos = new THREE.Vector3(0, 3, 8);
    const startTarget = new THREE.Vector3(0, 1, 0);
    
    // Этап 2: Первое приближение (не до конца) - только влево или прямо
    const midPos1 = new THREE.Vector3(-0.1, 1.8, 1.2);
    const midTarget1 = new THREE.Vector3(0, 1.1, 0);
    
    // Этап 3: Поворот влево (усиленный)
    const midPos2 = new THREE.Vector3(-0.5, 1.6, 0.8);
    const midTarget2 = new THREE.Vector3(0, 1.15, 0);
    
    // Этап 4: Финальное приближение - только влево
    const endPos = new THREE.Vector3(-0.2, 1.3, 0.5);
    const endTarget = new THREE.Vector3(0, 1.15, 0);

    camera.position.copy(startPos);
    camera.lookAt(startTarget);
    controls.target.copy(startTarget);

    function animateCamera() {
        if (!cameraAnimationActive) {
            return;
        }

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);

        let currentPos, currentTarget;

        if (progress < 0.3) {
            // Этап 1: Первое приближение (0-30%)
            const t = progress / 0.3;
            const easeT = easeInOutCubic(t);
            currentPos = new THREE.Vector3().lerpVectors(startPos, midPos1, easeT);
            currentTarget = new THREE.Vector3().lerpVectors(startTarget, midTarget1, easeT);
        } else if (progress < 0.5) {
            // Этап 2: Поворот влево (30-50%)
            const t = (progress - 0.3) / 0.2;
            const easeT = easeInOutCubic(t);
            currentPos = new THREE.Vector3().lerpVectors(midPos1, midPos2, easeT);
            currentTarget = new THREE.Vector3().lerpVectors(midTarget1, midTarget2, easeT);
        } else {
            // Этап 3: Финальное приближение (50-100%)
            const t = (progress - 0.5) / 0.5;
            const easeT = easeInOutCubic(t);
            currentPos = new THREE.Vector3().lerpVectors(midPos2, endPos, easeT);
            currentTarget = new THREE.Vector3().lerpVectors(midTarget2, endTarget, easeT);
        }

        camera.position.copy(currentPos);
        camera.lookAt(currentTarget);
        controls.target.copy(currentTarget);

        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        } else {
            // Анимация завершена
            cameraAnimationActive = false;
            animationCompleted = true;
            // Разрешаем пользователю управлять камерой
            controls.enabled = true;
        }
    }

    // Функция easing для плавности
    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Начинаем анимацию
    animateCamera();
}

// Mouse interaction
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Remove previous highlight
    if (hoveredObject) {
        highlightComponent(hoveredObject, false);
        hoveredObject = null;
    }

    // Find component
    if (intersects.length > 0) {
        let object = intersects[0].object;
        while (object && !object.userData.name) {
            object = object.parent;
        }

        if (object && object.userData.name) {
            hoveredObject = object;
            highlightComponent(object, true);
            renderer.domElement.style.cursor = 'pointer';
        } else {
            renderer.domElement.style.cursor = 'default';
        }
    } else {
        renderer.domElement.style.cursor = 'default';
    }
}

function highlightComponent(object, highlight) {
    if (!object) return;
    
    // Сохраняем оригинальные значения emissive для восстановления
    if (!object.userData.originalEmissive) {
        object.userData.originalEmissive = new Map();
    }
    
    object.traverse((child) => {
        if (child.isMesh && child.material) {
            if (Array.isArray(child.material)) {
                child.material.forEach((mat, index) => {
                    if (mat.emissive) {
                        const key = `${child.uuid}_${index}`;
                        if (highlight) {
                            // Сохраняем оригинальное значение
                            if (!object.userData.originalEmissive.has(key)) {
                                object.userData.originalEmissive.set(key, {
                                    color: mat.emissive.getHex(),
                                    intensity: mat.emissiveIntensity || 0
                                });
                            }
                            // Яркая неоновая подсветка
                            mat.emissive.setHex(0x00ffff);
                            mat.emissiveIntensity = 2.0;
                        } else {
                            // Восстанавливаем оригинальное значение
                            const original = object.userData.originalEmissive.get(key);
                            if (original) {
                                mat.emissive.setHex(original.color);
                                mat.emissiveIntensity = original.intensity;
                            } else {
                                mat.emissive.setHex(0x000000);
                                mat.emissiveIntensity = 0;
                            }
                        }
                    }
                });
            } else {
                if (child.material.emissive) {
                    const key = child.uuid;
                    if (highlight) {
                        // Сохраняем оригинальное значение
                        if (!object.userData.originalEmissive.has(key)) {
                            object.userData.originalEmissive.set(key, {
                                color: child.material.emissive.getHex(),
                                intensity: child.material.emissiveIntensity || 0
                            });
                        }
                        // Яркая неоновая подсветка
                        child.material.emissive.setHex(0x00ffff);
                        child.material.emissiveIntensity = 2.0;
                    } else {
                        // Восстанавливаем оригинальное значение
                        const original = object.userData.originalEmissive.get(key);
                        if (original) {
                            child.material.emissive.setHex(original.color);
                            child.material.emissiveIntensity = original.intensity;
                        } else {
                            child.material.emissive.setHex(0x000000);
                            child.material.emissiveIntensity = 0;
                        }
                    }
                }
            }
        }
    });
}

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        let object = intersects[0].object;
        while (object && !object.userData.name) {
            object = object.parent;
        }

        if (object && object.userData.name) {
            const componentType = object.userData.name;
            if (componentInfo[componentType]) {
                showInfoPanel(componentInfo[componentType]);
            }
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

// Window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (composer) {
        composer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Animate
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Animate dust particles
    if (dustParticles) {
        const positions = dustParticles.geometry.attributes.position.array;
        const velocities = dustParticles.geometry.userData.velocities;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            // Reset if out of bounds
            if (positions[i + 1] > 8) positions[i + 1] = 0;
            if (Math.abs(positions[i]) > 10) velocities[i] *= -1;
            if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1;
        }

        dustParticles.geometry.attributes.position.needsUpdate = true;
    }

    // Render
    if (composer) {
        composer.render();
    } else {
        renderer.render(scene, camera);
    }
}

// Initialize when page is loaded and Three.js is ready
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

