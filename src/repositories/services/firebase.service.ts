import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { config } from "@/config";
// import { getMessaging } from "firebase/messaging";

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const app = initializeApp(config.firebase);
const auth = getAuth(app);
// const messaging = getMessaging(app);

export {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
  // messaging
};
