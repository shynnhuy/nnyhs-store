import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PopupSlice, createAuthPopupSlice } from "./authPopup-slice";

export type Store = PopupSlice;

export const useStore = create<Store>()(
  devtools(
    persist(
      immer((...a) => ({ ...createAuthPopupSlice(...a) })),
      {
        name: "local-storage",
      }
    )
  )
);
