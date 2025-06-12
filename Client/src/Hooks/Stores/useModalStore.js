import { create } from "zustand";


export const useModalStore = create((set) => ({
    showModal: false,
    currentId:null,
    OpenModal: (id = null) => {
        if (id===null|| typeof id ==="string"|| typeof id==="number") {
             set({ showModal: true , currentId:id})
        }
       
    },
    CloseModal: () => {
        set({ showModal: false , currentId:null})
    },
}));