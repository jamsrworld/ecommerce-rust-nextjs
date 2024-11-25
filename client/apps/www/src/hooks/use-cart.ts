import { create } from "zustand";

type CartState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

export const useCart = create<CartState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
