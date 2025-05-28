/*
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('forms-section').style.display = 'block';
        document.getElementById('user-info').textContent = `Logged in as ${user.displayName}`;
        loadOrganizations();
    } else {
        document.getElementById('forms-section').style.display = 'none';
        document.getElementById('user-info').textContent = '';
    }
});

function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log("Signed in as:", result.user.displayName);
        })
        .catch((error) => {
            console.error("Login error:", error);
        });
}

function logout() {
    auth.signOut();
}

document.getElementById('hours-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const data = {
        userId: user.uid,
        date: document.getElementById('date').value,
        hours: parseFloat(document.getElementById('hours').value),
        description: document.getElementById('description').value,
        orgId: document.getElementById('organization-select').value
    };

    await db.collection('serviceHours').add(data);
    alert("Service hours logged!");
});

document.getElementById('org-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const orgData = {
        name: document.getElementById('org-name').value,
        address: document.getElementById('org-address').value,
        contact: {
            firstName: document.getElementById('contact-first').value,
            lastName: document.getElementById('contact-last').value,
            title: document.getElementById('contact-title').value,
            email: document.getElementById('contact-email').value,
            phone: document.getElementById('contact-phone').value
        }
    };

    const orgRef = await db.collection('organizations').add(orgData);
    alert("Organization added!");
    loadOrganizations();
});

async function loadOrganizations() {
    const select = document.getElementById('organization-select');
    select.innerHTML = '';
    const snapshot = await db.collection('organizations').get();
    snapshot.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = doc.data().name;
        select.appendChild(option);
    });
}
*/

if (typeof firebase === 'undefined') {
    alert("Firebase SDK not loaded!");
}

function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            document.getElementById("user-info").textContent = `Hello, ${user.displayName}`;
            console.log("Logged in:", user);
        })
        .catch((error) => {
            console.error("Login error:", error);
        });
}

function logout() {
    firebase.auth().signOut()
        .then(() => {
            document.getElementById("user-info").textContent = "";
            console.log("Logged out");
        })
        .catch((error) => {
            console.error("Logout error:", error);
        });
}
