import toast from "react-hot-toast";
import { axiosInstance } from "../api/axios";
import { create } from "zustand";

export const useEditStore = create((set) => ({
    hero: null,
    navbar: null,
    heroLoading: false,
    navbarLoading: false,

    fetchHero: async (data) => {
        set({ heroLoading: true })
        try {
            const res = await axiosInstance.post("/edit/hero", data);
            set({ hero: res.data.data })

            toast.success("Upload successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ heroLoading: false });
        }
    },

    fetchNavbar: async (data) => {
        set({ navbarLoading: true })
        try {
            const res = await axiosInstance.post("/edit/navbar", data);
            set({ navbar: res.data.data });

            toast.success("Navbar Update successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ navbarLoading: false });
        }
    }
}))