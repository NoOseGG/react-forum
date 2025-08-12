import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { User } from "../types/types";

interface InitialState {
  user: User | null;
}

interface Actions {
  setUser: (user: User | null) => void;
}

interface UserState extends InitialState, Actions {}

const initialState: InitialState = {
  user: null,
};

const userState: StateCreator<UserState> = set => ({
  ...initialState,
  setUser: user => set(() => ({ user: user })),
});

const useUserState = create<UserState>()(
  devtools(persist(userState, { name: "user-storage" })),
);

export const useUser = () => useUserState(state => state.user);
export const useSetUser = () => useUserState(state => state.setUser);
