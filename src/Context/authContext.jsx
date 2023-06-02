import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./../Firebase/config";
import { doc, getDoc, setDoc} from 'firebase/firestore'
import swal from "sweetalert";


const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

// Application authentication provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // firebase's register
  const signup = async (name, lastname, email, password, role) => {
    const info_usuario = await createUserWithEmailAndPassword(auth, email, password).then((newUser) => {
      return newUser
    });
    // search an user by his uid
    const docRef = doc(db, `usuarios/${info_usuario.user.uid}`)
    // Creating a firebase's document with the user's information
    await setDoc(docRef, { name: name, lastname: lastname, email: email, password: password, role: parseInt(role),libros:[] })
  };

  // firebase's login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Query: User's role
  const role = async (usuario) => {
    const docRef = doc(db, `usuarios/${usuario.uid}`)
    const query = await getDoc(docRef)
    const role = await query.data().role
    return role

  }
  

  // Firebase's sign Out
  const logout = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error.message)
    }
  }

  const validate = (code) => {
    if(code === "auth/user-not-found"){
      return swal({
        title: `${code}`,
        text: `This email is not registered, what if you create an account?`,
        icon: "error",
      });
    }
    if(code === "auth/wrong-password"){
      return swal({
        title: `${code}`,
        text: `Incorrect password`,
        icon: "error",
      });
    }
    if(code === "auth/weak-password"){
      return swal({
        title: `${code}`,
        text: `Your password must have 6 characters`,
        icon: "error",
      });
    }
    if(code === "auth/invalid-email"){
      return swal({
        title: `${code}`,
        text: `Please enter an email`,
        icon: "error",
      });
    }
    if(code === "auth/missing-password"){
      return swal({
        title: `${code}`,
        text: `Please enter a password`,
        icon: "error",
      });
    }
    if(code === "auth/email-already-in-use"){
      return swal({
        title: `${code}`,
        text: `The email entered is already registered`,
        icon: "error",
      });
    }
  }

  // User session
  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        role,
        validate
      }}
    >
      {children}
    </authContext.Provider>
  );
}