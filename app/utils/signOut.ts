import { auth } from "../../lib/firebase.config";

export const signOut = () => {
  return auth.signOut();
};
