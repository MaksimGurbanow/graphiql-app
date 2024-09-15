import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase.config";

async function signUp(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export default signUp;
