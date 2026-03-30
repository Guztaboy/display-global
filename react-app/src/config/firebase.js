import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8crGl2xSoe8c0kRDA03CxRcsJtsH-Hz8",
  authDomain: "painel-engenharia-e2b60.firebaseapp.com",
  projectId: "painel-engenharia-e2b60",
  storageBucket: "painel-engenharia-e2b60.firebasestorage.app",
  messagingSenderId: "754848525033",
  appId: "1:754848525033:web:10dc9a0eba7395fc069e78",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection name for Sala 1
export const ROOM_COLLECTION = "sala1";
