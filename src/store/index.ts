import { create } from "zustand";

type Store = {
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  isSpeaking: false,
  setIsSpeaking: (value) => {
    set({ isSpeaking: value });
  },
}));
