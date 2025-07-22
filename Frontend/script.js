async function getMood() {
  const input = document.getElementById("moodInput").value;
  const res = await fetch("https://moodart.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input })
  });

  const data = await res.json();

  console.log("Backend returned:", data);  // 🔍 Add this
  if (!data.mood) {
    alert("No mood returned from server.");
    return;
  }

  renderMoodArt(data.mood);
}


function renderMoodArt(mood) {
  document.getElementById("three-canvas").innerHTML = ""; // clear previous

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("three-canvas").appendChild(renderer.domElement);

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
