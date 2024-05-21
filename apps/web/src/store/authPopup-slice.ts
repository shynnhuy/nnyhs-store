import { StateCreator } from "zustand";

type PopupState = {
  open: boolean;
};

type PopupActions = {
  openModal: () => void;
  closeModal: () => void;
};

export type PopupSlice = PopupState & PopupActions;

export const createAuthPopupSlice: StateCreator<
  PopupSlice,
  [],
  [],
  PopupSlice
> = (set) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
});
