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
  onAuthStateChanged,
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

const checkEmailVerification = (router, notVerified) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          unsubscribe();
          router.push('/');
          resolve();
        } else {
          console.log('Email not verified yet.');
          notVerified.value = true;
          resolve();
        }
      } else {
        reject(new Error('No user found'));
      }
    });
  });
};

export { register, login, loginWithGoogle, logout, forgotPassword, checkEmailVerification };