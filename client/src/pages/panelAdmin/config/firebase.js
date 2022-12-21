import { initializeApp } from "firebase/app";
import { ref, getStorage, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE,
  messagingSenderId: import.meta.env.VITE_MESSA,
  appId: import.meta.env.VITE_APPID
};

export const upload = async (file) => {
  const store = getStorage();
  const id = v4();
  const storeRef = ref(store, id);
  await uploadBytes(storeRef, file)
  const url = await getDownloadURL(storeRef)
  return { url, id };
}

export const deleteImg = async (id) => {
  try {
    const store = getStorage();
    const defRef = ref(store, id);
    await deleteObject(defRef);
    return;
  } catch (error) {
    console.log(error.message)
  }
}

export const app = initializeApp(firebaseConfig);