import firebase from "firebase/compat/app";

export type FireBaseUser = firebase.User | null;
export type UserCredential = firebase.auth.UserCredential;

export type Task = {
  name: string,
  priority: string,
  dueDate: any,
  group: string,
  pictureUrl?: string | null,
};

export type List = {
  name: string,
  color?: string
}

export type Group = {
  name: string,
  color: string,
  type: string,
}

export type ID = {
  id: string;
}

export type TasksStore = Task & ID;
