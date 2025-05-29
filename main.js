// main.js
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { app } from './firebase.js';
import { populateOrganizations, getOrgDataById } from './services/organizationService.js';

const auth = getAuth(app);
const db = getFirestore(app);

// --- UI Handlers ---

export function handleLoginUI(user) {
    document.getElementById("user-info").textContent = `Welcome, ${user.displayName}`;
    document.getElementById("log-container").style.display = "block";
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline";
}

export function handleLogoutUI() {
    document.getElementById("user-info").textContent = "";
    document.getElementById("log-container").style.display = "none";
    document.getElementById("login-btn").style.display = "inline";
    document.getElementById("logout-btn").style.display = "none";
}

export async function initApp() {
    document.getElementById("login-btn").addEventListener("click", async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            alert("Login failed: " + err.message);
        }
    });

    document.getElementById("logout-btn").addEventListener("click", async () => {
        await signOut(auth);
    });

    onAuthStateChanged(auth, async (user) => {
        if (user && user.email.endsWith("@hobynye.org")) {
            handleLoginUI(user);
            await populateOrganizations(user.uid);
        } else if (user) {
            alert("Only @hobynye.org emails are allowed.");
            await signOut(auth);
        } else {
            handleLogoutUI();
        }
    });

    document.getElementById("org-select").addEventListener("change", async (e) => {
        const orgId = e.target.value;
        const isNew = orgId === "";
        const fieldIds = [
            "org-name", "org-address", "org-city", "org-state", "org-zip",
            "contact-first", "contact-last", "contact-title", "contact-email", "contact-phone"
        ];

        document.getElementById("new-org-fields").style.display = "block";

        if (isNew) {
            fieldIds.forEach(id => {
                const el = document.getElementById(id);
                el.value = "";
                el.readOnly = false;
                el.disabled = false;
            });
        } else {
            const org = await getOrgDataById(orgId);
            if (org) {
                document.getElementById("org-name").value = org.name || "";
                document.getElementById("org-address").value = org.address || "";
                document.getElementById("org-city").value = org.city || "";
                document.getElementById("org-state").value = org.state || "";
                document.getElementById("org-zip").value = org.zip || "";
                const c = org.contact || {};
                document.getElementById("contact-first").value = c.firstName || "";
                document.getElementById("contact-last").value = c.lastName || "";
                document.getElementById("contact-title").value = c.title || "";
                document.getElementById("contact-email").value = c.email || "";
                document.getElementById("contact-phone").value = c.phone || "";

                fieldIds.forEach(id => {
                    document.getElementById(id).readOnly = true;
                    document.getElementById(id).disabled = true;
                });
            }
        }
    });

    document.getElementById("log-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user) {
            alert("Please log in.");
            return;
        }

        const orgSelect = document.getElementById("org-select");
        const selectedOrg = orgSelect.value;
        let orgId;

        if (selectedOrg) {
            orgId = selectedOrg;
        } else {
            const orgRef = await addDoc(collection(db, "organizations"), {
                uid: user.uid,
                name: document.getElementById("org-name").value,
                address: document.getElementById("org-address").value,
                city: document.getElementById("org-city").value,
                state: document.getElementById("org-state").value,
                zip: document.getElementById("org-zip").value,
                contact: {
                    firstName: document.getElementById("contact-first").value,
                    lastName: document.getElementById("contact-last").value,
                    title: document.getElementById("contact-title").value,
                    email: document.getElementById("contact-email").value,
                    phone: document.getElementById("contact-phone").value
                }
            });
            orgId = orgRef.id;
            await populateOrganizations(user.uid);
            orgSelect.value = orgId;
        }

        await addDoc(collection(db, "users", user.uid, "hours"), {
            date: document.getElementById("log-date").value,
            hours: parseFloat(document.getElementById("log-hours").value),
            organizationId: orgId,
            timestamp: new Date()
        });

        alert("Service hours logged.");
        document.getElementById("log-form").reset();
    });
}
