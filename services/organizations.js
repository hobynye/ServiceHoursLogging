import { collection, addDoc, getDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { db } from "./firebase.js";

export async function getUserOrganizations(uid) {
    const snapshot = await getDocs(collection(db, "organizations"));
    const orgs = [];
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.uid === uid) {
            orgs.push({ id: docSnap.id, ...data });
        }
    });
    return orgs;
}

export async function getOrganizationById(orgId) {
    const orgSnap = await getDoc(doc(db, "organizations", orgId));
    return orgSnap.exists() ? { id: orgSnap.id, ...orgSnap.data() } : null;
}

export async function addOrganization(uid, orgData) {
    const docRef = await addDoc(collection(db, "organizations"), {
        uid,
        ...orgData
    });
    return docRef.id;
}
