import firebase from "firebase/compat/app";

export type FireBaseUser = firebase.User | null;
export type UserCredential = firebase.auth.UserCredential;

export type Task = {
  name: string,
  priority: string,
  dueDate: any,
  group: string,
};

export type ID = {
  id: string;
}

export type TasksStore = Task & ID;
