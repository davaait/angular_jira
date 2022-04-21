import firebase from "firebase/compat/app";

export type FireBaseUser = firebase.User | null;
export type UserCredential = firebase.auth.UserCredential;

export type Task = {
  taskName: string,
  taskGroup: string
};

export type ID = {
  id: string;
}

export type TasksStore = Task & ID;
