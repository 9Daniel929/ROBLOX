let scene, camera, renderer, head, torso, is3DStarted = false;
let currentUser = null;

// --- AUTH ---
document.getElementById('signup-btn').onclick = () => {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users') || "[]");
    if (users.find(x => x.username === u)) return alert("Taken!");
    users.push({ username: u, password: p, balance: 0, inventory: [] });
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('status-msg').style.color = "#00e676";
    document.getElementById('status-msg').innerText = "Account Created!";
};

document.getElementById('login-btn').onclick = () => {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users') || "[]");
    const user = users.find(x => x.username === u && x.password === p);
    if (user) {
        currentUser = user;
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('nav').classList.remove('hidden');
        document.getElementById('sidebar').classList.remove('hidden');
        document.getElementById('user-display').innerText = user.username;
        document.getElementById('balance-display').innerText = "R$: " + user.balance;
        showTab('home');
    } else alert("Invalid Login!");
};

// --- NAVIGATION ---
function showTab(tabId) {
    document.querySelectorAll('.container').forEach(c => c.classList.add('hidden'));
    document.querySelectorAll('.side-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');
    
    // Highlight active side button
    const btns = document.querySelectorAll('.side-btn');
    btns.forEach(btn => { if(btn.innerText.toLowerCase() === tabId) btn.classList.add('active'); });

    if (tabId === 'avatar' && !is3DStarted) {
        setTimeout(init3D, 150);
    }
}

// --- 3D SYSTEM ---
function init3D() {
    is3DStarted = true;
    const container = document.getElementById('avatar-3d-container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const skin = new THREE.MeshLambertMaterial({ color: 0xffdbac });
    head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), skin);
    head.position.y = 1.2;
    scene.add(head);

    torso = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.5, 0.6), new THREE.MeshLambertMaterial({ color: 0x00b2ff }));
    scene.add(torso);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 5);
    scene.add(light, new THREE.AmbientLight(0x404040));
    camera.position.z = 4;

    function animate() {
        requestAnimationFrame(animate);
        head.rotation.y += 0.01;
        torso.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

function changeColor(hex) { if(head) head.material.color.setHex(hex); }

// --- SEARCH & MONEY ---
document.getElementById('search-btn').onclick = () => {
    const q = document.getElementById('search-input').value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('users') || "[]");
    const found = users.find(u => u.username.toLowerCase() === q);
    if (found) {
        document.getElementById('search-results').classList.remove('hidden');
        document.getElementById('found-name').innerText = "Found: " + found.username;
    } else alert("Not found!");
};

document.getElementById('buy-roblex-btn').onclick = () => document.getElementById('pay-modal').classList.remove('hidden');
document.getElementById('close-modal').onclick = () => document.getElementById('pay-modal').classList.add('hidden');

document.getElementById('confirm-pay').onclick = () => {
    const amt = parseInt(document.getElementById('pay-amount').value);
    currentUser.balance += amt;
    document.getElementById('balance-display').innerText = "R$: " + currentUser.balance;
    saveData();
    document.getElementById('pay-modal').classList.add('hidden');
    alert("Successful bought!");
};

function buyItem(name, price) {
    if(currentUser.balance < price) return alert("Not enough R$!");
    currentUser.balance -= price;
    currentUser.inventory.push(name);
    document.getElementById('balance-display').innerText = "R$: " + currentUser.balance;
    saveData();
    alert("Purchased " + name);
}

function saveData() {
    let users = JSON.parse(localStorage.getItem('users'));
    const idx = users.findIndex(u => u.username === currentUser.username);
    users[idx] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
}

document.getElementById('logout-btn').onclick = () => location.reload();
