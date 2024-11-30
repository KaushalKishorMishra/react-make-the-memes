import { create } from "zustand";

export const useImageStore = create((set) => ({
  imageBlob: null,
  imageUrl: null,
  setImage: (newImageBlob, newImageUrl) =>
    set({ imageBlob: newImageBlob, imageUrl: newImageUrl }),
  getImage: () => {
    const { imageBlob, imageUrl } = useImageStore.getState();
    return { imageBlob, imageUrl };
  },
}));
