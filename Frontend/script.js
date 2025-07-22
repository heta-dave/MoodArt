document.getElementById("generateBtn").addEventListener("click", getMood);

async function getMood() {
  const input = document.getElementById("moodInput").value;
  try {
    const res = await fetch("https://moodart.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    renderMoodArt(data.mood);
  } catch (err) {
    console.error("Error fetching mood:", err);
  }
}

function renderMoodArt(mood) {
  const canvasDiv = document.getElementById("three-canvas");
  canvasDiv.innerHTML = ""; // clear previous

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvasDiv.appendChild(renderer.domElement);

  let geometry, material;

  if (mood === "joy") {
    geometry = new THREE.TorusKnotGeometry();
    material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
  } else if (mood === "sadness") {
    geometry = new THREE.SphereGeometry(5, 32, 32);
    material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
  } else {
    geometry = new THREE.BoxGeometry();
    material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
  }

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  camera.position.z = 20;

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}
