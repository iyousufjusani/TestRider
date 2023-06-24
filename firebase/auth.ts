import {
  Auth,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
  User,
  updatePassword,
  OAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
  apple: new OAuthProvider("apple.com"),
};
export const createUserWithEmailAndPass = async (
  auth: Auth,
  email: string,
  password: string
) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const signInWithEmailAndPass = async (
  auth: Auth,
  email: string,
  password: string
) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
};
export const signInWithPopupAuth = async (auth: Auth, providerName: string) => {
  let provider = providers[providerName];

  const user = await signInWithPopup(auth, provider);
  return user;
};

export const userLogout = async (auth: Auth) => {
  const user = await signOut(auth);
  return user;
};

export const userReauthenticate = async (user: User, password: string) => {
  if (!user.email) {
    return;
  }
  const credentials = EmailAuthProvider.credential(user?.email, password);
  const athticated = await reauthenticateWithCredential(user, credentials);
  return athticated.user;
};

export const userUpdatePassword = async (user: User, newPassword: string) => {
  const updated = await updatePassword(user, newPassword);
  return updated;
};
