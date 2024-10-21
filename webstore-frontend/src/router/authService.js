import { auth } from '@/firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
  } from "firebase/auth";

const provider = new GoogleAuthProvider();

const register = async (firstName, lastName, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
    displayName: `${firstName} ${lastName}`
  });
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const loginWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

const logout = async () => {
  await signOut(auth);
  localStorage.removeItem('user');
};

const forgotPassword = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

export { register, login, loginWithGoogle, logout, forgotPassword };