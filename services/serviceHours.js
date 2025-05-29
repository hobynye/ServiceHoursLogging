import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { db } from "./firebase.js";

export async function logServiceHours(uid, log) {
    await addDoc(collection(db, "users", uid, "hours"), {
        ...log,
        timestamp: new Date()
    });
}
