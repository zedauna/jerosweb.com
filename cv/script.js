// Scène et contrôles
const container = document.querySelector("canvas");

const scene = new THREE.Scene();
// axes
// scene.add(new THREE.AxesHelper());

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;
camera.position.x = 0.5;
camera.position.y = 0.5;
scene.add(camera);

//Texture
const textureLoader = new THREE.TextureLoader();
const circleTexture = textureLoader.load("./cv/img/circle.png");

//objet
const count = 100;
const distance = 4;
const points = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < points.length; i++) {
  points[i] = THREE.MathUtils.randFloatSpread(distance * 2);
  colors[i] = Math.random();
}

const Geometry = new THREE.BufferGeometry();
Geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
Geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

const pointMaterial = new THREE.PointsMaterial({
  // color:0xff0000,
  vertexColors: THREE.VertexColors,
  size: 0.4,
  map: circleTexture,
  alphaTest: 0.01,
  transparent: true,
});
const pointsObject = new THREE.Points(Geometry, pointMaterial);
// scene.add(pointsObject);

// const lineMaterial =new THREE.LineBasicMaterial({
//     color:0x0000000,
//     opacity:0.05,
//     // depthTest:false,
//     depthWrite:false,
// })
// const lineObject= new THREE.Line(Geometry,lineMaterial);

const group = new THREE.Group();
group.add(pointsObject);
// group.add(lineObject);
scene.add(group);

// rendu à l'ecran
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas: container,
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// container.appendChild(renderer.domElement);

// naviguer sur plusieurs axes
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Gestion de la rotation
const clock = new THREE.Clock();

//rotation par souris
let mouseX = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
});

function tick() {
  // group.rotateY(0.01*Math.PI);

  //rotation par time
  const time = clock.getElapsedTime();
  group.rotation.y = time * 0.1;

  //rotation par souris
  // const ratio=(mouseX/window.innerWidth -0.5)*2;
  // group.rotation.y=ratio * Math.PI* 0.1;

  renderer.render(scene, camera);
  camera.lookAt(0, 0, 0);
  controls.update();
  requestAnimationFrame(tick);
}
tick();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
