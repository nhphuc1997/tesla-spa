import { create } from 'zustand'

export const useStore = create((set) => ({
  currentMaterial: [],
  currentProductImages: [],
  currentExterior: {},
  currentInterior: {},
  currentAlloy: {},
  currentProductName: '--',
  currentProductPrice: 0,
  setCurrentMaterial: (material: any) => set(() => ({ currentMaterial: material })),
  setCurrentExterior: (exterior: any) => set(() => ({ currentExterior: exterior })),
  setCurrentInterior: (interior: any) => set(() => ({ currentInterior: interior })),
  setCurrentAlloy: (alloy: any) => set(() => ({ currentAlloy: alloy })),
  setCurrentProductName: (name: string) => set(() => ({ currentProductName: name })),
  setCurrentProductPrice: (price: number) => set(() => ({ currentProductPrice: price })),
  setCurrentProductImages: (images: any) => set(() => ({ currentProductImages: images })),
}))
