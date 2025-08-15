import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { FilterPost, User } from "../types/types";

interface InitialState {
  user: User | null;
  filterPost: FilterPost;
}

interface Actions {
  setUser: (user: User | null) => void;
  setFilterPost: (filter: FilterPost) => void;
}

interface UserState extends InitialState, Actions {}

const initialState: InitialState = {
  user: null,
  filterPost: "date",
};

const userState: StateCreator<UserState> = set => ({
  ...initialState,
  setUser: user => set(() => ({ user: user })),
  setFilterPost: filter => set(() => ({ filterPost: filter })),
});

const useUserState = create<UserState>()(
  devtools(persist(userState, { name: "user-storage" })),
);

export const useUser = () => useUserState(state => state.user);
export const useSetUser = () => useUserState(state => state.setUser);
export const useFilterPost = () => useUserState(state => state.filterPost);
export const useSetFilterPost = () =>
  useUserState(state => state.setFilterPost);
