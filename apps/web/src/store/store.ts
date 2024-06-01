import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AuthSlice, createAuthSlice } from "./auth.slice";

export type Store = AuthSlice;

export const useStore = create<Store>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createAuthSlice(...a),
      })),
      {
        name: "auth-state",
      }
    )
  )
);
