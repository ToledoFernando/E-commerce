import { initializeApp } from "firebase/app";
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
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
  const storeRef = ref(store, v4());
  await uploadBytes(storeRef, file)
  const url = await getDownloadURL(storeRef)
  return url;
}

export const app = initializeApp(firebaseConfig);