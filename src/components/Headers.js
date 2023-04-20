import React, { useState } from 'react';
import { useAuth } from '../contexs/AuthContext';
import {
  getTokenFromLocalStorage,
  saveUserTokenToLocalStorage,
} from '../token/localStorage';
import { loginSuccess } from '../services/authUser-services';
import { getFiles } from '../services/file-services';
import FileList from './FileListUpload/FileList';

export default function Headers() {
  const { newUserList, login, logout, user } = useAuth();

  const handleLogin = () => {
    login((response) => {
      const user = response.user;
      const { displayName, email, uid, photoUrl } = user;

      const payload = {
        email,
        displayName,
        uid,
        photoUrl,
      };

      loginSuccess(payload).then((response) => {
        getFiles().then((response) => {
          newUserList(response.files);
        });
        saveUserTokenToLocalStorage(response.accessToken);
      });
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-warning p-4">
      <h1 className="d-inline">
        <b>Upload Files using Google</b>
      </h1>
      {user && (
        <button onClick={handleLogout} className="btn btn-primary btn-lg ms-5">
          Sing Out
        </button>
      )}
      {!user && (
        <button
          onClick={handleLogin}
          className="d-block btn btn-primary btn-lg m-3 mt-5">
          Sing in with Google
        </button>
      )}
    </div>
  );
}
