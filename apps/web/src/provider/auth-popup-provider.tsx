"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { createStore } from "zustand/vanilla";

export type AuthPopupState = {
  open: boolean;
};

export type AuthPopupActions = {
  openModal: () => void;
  closeModal: () => void;
};

export type AuthPopupStore = AuthPopupState & AuthPopupActions;

export const initAuthPopupStore = (): AuthPopupState => {
  return { open: false };
};

export const defaultInitState: AuthPopupState = {
  open: false,
};

export const createAuthPopupStore = (
  initState: AuthPopupState = defaultInitState
) => {
  return createStore<AuthPopupStore>()((set) => ({
    ...initState,
    openModal: () => set({ open: true }),
    closeModal: () => set({ open: false }),
  }));
};

export const AuthPopupStoreContext =
  createContext<StoreApi<AuthPopupStore> | null>(null);

export interface AuthPopupStoreProviderProps {
  children: ReactNode;
}

export const AuthPopupStoreProvider = ({
  children,
}: AuthPopupStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AuthPopupStore>>();
  if (!storeRef.current) {
    storeRef.current = createAuthPopupStore(initAuthPopupStore());
  }

  return (
    <AuthPopupStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthPopupStoreContext.Provider>
  );
};

export const useAuthPopupStore = <T,>(
  selector: (store: AuthPopupStore) => T
): T => {
  const authPopupStoreContext = useContext(AuthPopupStoreContext);

  if (!authPopupStoreContext) {
    throw new Error(
      `useAuthPopupStore must be use within AuthPopupStoreProvider`
    );
  }

  return useStore(authPopupStoreContext, selector);
};
