// Configuração do Three.js para o fundo de estrelas
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Configurar o tamanho do renderizador
renderer.setSize(window.innerWidth, window.innerHeight);

// Adicionar o renderizador ao contêiner
const container = document.getElementById('starry-background');
if (container) {
    container.appendChild(renderer.domElement);
} else {
    console.error('Contêiner #starry-background não encontrado!');
    throw new Error('Contêiner #starry-background não encontrado!');
}

// Criar estrelas usando THREE.Points
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5, // Tamanho das estrelas
        sizeAttenuation: true, // Faz com que as estrelas pareçam menores à distância
    });

    const starVertices = [];
    for (let i = 0; i < 500; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

// Adicionar estrelas
createStars();

// Configurar câmera
camera.position.z = 5;

// Animação
function animate() {
    requestAnimationFrame(animate);

    // Rotação lenta da cena
    scene.rotation.y += 0.0005; // Reduz a velocidade de rotação

    renderer.render(scene, camera);
}

animate();

// Ajustar tamanho ao redimensionar a janela
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});