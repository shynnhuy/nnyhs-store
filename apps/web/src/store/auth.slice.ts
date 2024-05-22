import { ERole, TTokens, TUser } from "@/api";
import { StateCreator } from "zustand";

type AuthState = {
  open: boolean;
  isAuth: boolean;
  isAdmin: boolean;
  user?: TUser;
  tokens?: TTokens;
};

type AuthActions = {
  openModal: () => void;
  closeModal: () => void;
  loggedIn: (data: { user: TUser; tokens: TTokens }) => void;
  logOut: () => void;
  setTokens: (tokens: TTokens) => void;
};

export type AuthSlice = AuthState & AuthActions;

const initialState: AuthState = {
  isAuth: false,
  isAdmin: false,
  open: false,
};

export const createAuthSlice: StateCreator<
  AuthSlice,
  [["zustand/immer", never]],
  [],
  AuthSlice
> = (set) => ({
  ...initialState,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
  loggedIn: ({ user, tokens }) =>
    set({ isAuth: true, isAdmin: user.role === ERole.ADMIN, user, tokens }),
  logOut: () => set({ isAuth: false, user: undefined, tokens: undefined }),
  setTokens: (tokens) => set({ tokens }),
});
