import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  //Methods for firestore database
  collection,
  writeBatch,
  query,
  getDocs

} from "firebase/firestore";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWXNbry-Rj05jDaCI9KgqbHAMmaYPxwJI",
  authDomain: "clothing-db-17a66.firebaseapp.com",
  projectId: "clothing-db-17a66",
  storageBucket: "clothing-db-17a66.firebasestorage.app",
  messagingSenderId: "793075269383",
  appId: "1:793075269383:web:ed728e5e21a2b557f38fa2",
};

// ✅ Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);


//function for adding the new collection to our database 
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach( (object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done')

}

// function to fetch data from the firestore database
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db,'categories');
  const q = query(collectionRef);
  
  const querySnanpShot = await getDocs(q);
  const categoryMap = querySnanpShot.docs.reduce((acc , docSnapshot) => {
    const {title,items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}


// ✅ Set up Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// ✅ Set up GitHub Auth Provider
const githubProvider = new GithubAuthProvider();

// ✅ Sign-in functions with error handling
export const signInWithGooglePopup = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

export const signInWithGoogleRedirect = async () => {
  try {
    return await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Google Redirect Sign-In Error:", error);
  }
};

export const signInWithGitHub = async () => {
  try {
    return await signInWithPopup(auth, githubProvider);
  } catch (error) {
    console.error("GitHub Sign-In Error:", error);
  }
};

// ✅ Get Redirected User After Sign-In
export const getRedirectedUser = async () => {
  try {
    const response = await getRedirectResult(auth);
    return response ? response.user : null;
  } catch (error) {
    console.error("Error getting redirected user:", error);
  }
};

// ✅ Create User Document in Firestore
export const createUserDocumentFromAuth = async (userAuth, additionInformation= {} ) => {
  if (!userAuth) {
    console.error("No user authentication data found.");
    return;
  }

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName,
         email,
        createdAt,
        additionInformation });
      console.log("User document created successfully!");
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    const auth = getAuth(); // ✅ Get Firebase auth instance
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error creating user with email and password:", error);
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    const auth = getAuth(); // ✅ Get Firebase auth instance
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error creating user with email and password:", error);
  }
};

export const SignOutUser = () => signOut(auth);

export const onAuthChangedListner = (callback) =>
  onAuthStateChanged(auth,callback)