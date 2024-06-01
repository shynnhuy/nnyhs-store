import { ERole, TTokens, TUser } from "@/services";
import { StateCreator } from "zustand";

type AuthState = {
  isAuth: boolean;
  isAdmin: boolean;
  user?: TUser;
  tokens?: TTokens;
};

type AuthActions = {
  loggedIn: (data: { user: TUser; tokens?: TTokens }) => void;
  logOut: () => void;
  setTokens: (tokens: TTokens) => void;
};

export type AuthSlice = AuthState & AuthActions;

const initialState: AuthState = {
  isAuth: false,
  isAdmin: false,
};

export const createAuthSlice: StateCreator<
  AuthSlice,
  [["zustand/immer", never]],
  [],
  AuthSlice
> = (set) => ({
  ...initialState,
  loggedIn: ({ user, tokens }) =>
    set({ isAuth: true, isAdmin: user.role === ERole.ADMIN, user, tokens }),
  logOut: () => set({ isAuth: false, user: undefined, tokens: undefined }),
  setTokens: (tokens) => set({ tokens }),
});
