import firebase from "firebase/compat/app";

export type FireBaseUser = firebase.User | null;
export type UserCredential = firebase.auth.UserCredential;

export type Task = {
  name: string,
  priority: string,
  dueDate?: any,
  group: string,
  pictureUrl?: string | null,
  description: string | null,
  dateOfCreation?: string | null,
  updateDate?: string | null,
  images?: string[],
  history?: string[],
  activeUser?: string,
  assignedUser: string,
  boardID?: string,
};

export type List = {
  name: string,
  color: string,
  tasksArray?: TasksStore[],
  id?: string,
  activeUser?: string,
  boardID?: string,
}

export type Board = {
  name: string,
}

export type User = {
  name: string | undefined | null,
  userId?: string | undefined,
  avatarUrl: string | undefined | null,
}

export type ID = {
  id: string;
}

export type TasksStore = Task & ID;
export type BoardStore = Board & ID;
export type UserStore = User & ID;
