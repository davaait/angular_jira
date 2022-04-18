import firebase from "firebase/compat/app";

export type FireBaseUser = firebase.User | null;
export type UserCredential = firebase.auth.UserCredential;

export type User = {
  name: string;
  surname: string;
};

export type ID = {
  id: string;
}

export type UserStore = User & ID;
