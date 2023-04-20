import React, { useEffect, useState } from 'react';
import '../firebase';
import { useContext } from 'react';

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { removeTokenFromLocalStorage } from '../token/localStorage';
//import { getFiles } from '../services/file-services';

const authProvider = new GoogleAuthProvider();

const AuthContext = React.createContext({});
const auth = getAuth();

const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [newUserfiles, setNewUserfiles] = useState([]);
  const login = (callback = () => {}) => {
    console.log('Login From Auth Context');
    signInWithPopup(auth, authProvider)
      .then((response) => {
        if (response) {
          callback(response);
          setUser(response.user);
          // const user = response.user
        }
      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          // Handle the error appropriately
          console.log('Popup closed by user');
        } else {
          // Handle other errors
          console.log(error);
        }
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged');
      setUser(user);
      //console.log(user);
    });
    return () => {
      unsubscribe();
    };
  });

  const logout = () => {
    signOut(auth);
    // removeTokenFromLocalStorage();
  };

  const newUserList = (newUserfiles) => {
    setNewUserfiles(newUserfiles);
  };
  return (
    <AuthContext.Provider
      value={{ newUserList, newUserfiles, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
