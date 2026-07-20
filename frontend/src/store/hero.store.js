import toast from "react-hot-toast";
import { axiosInstance } from "../api/axios";
import { create } from "zustand";

export const useEditStore = create((set) => ({

    hero: null,
    navbar: null,

    heroLoading: false,
    navbarLoading: false,

    heroUpdateLoading: false,
    navbarUpdateLoading: false,

    fetchHero: async () => {
        set({ heroLoading: true });

        try {
            const res = await axiosInstance.get("/content/hero");

            set({
                hero: res.data.data
            });

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load hero"
            );

        } finally {
            set({ heroLoading: false });
        }
    },

    fetchNavbar: async () => {
        set({ navbarLoading: true });

        try {
            const res = await axiosInstance.get("/content/navbar");

            set({
                navbar: res.data.data
            });

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load navbar"
            );

        } finally {
            set({ navbarLoading: false });
        }
    },

    updateHero: async (data) => {
        set({ heroUpdateLoading: true });

        try {
            const res = await axiosInstance.post(
                "/edit/hero",
                data
            );

            set({
                hero: res.data.data
            });

            toast.success("Hero updated successfully");

            return true;

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update hero"
            );

            return false;

        } finally {
            set({ heroUpdateLoading: false });
        }
    },

    updateNavbar: async (data) => {
        set({ navbarUpdateLoading: true });

        try {
            const res = await axiosInstance.post(
                "/edit/navbar",
                data
            );

            set({
                navbar: res.data.data
            });

            toast.success("Navbar updated successfully");

            return true;

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update navbar"
            );

            return false;

        } finally {
            set({ navbarUpdateLoading: false });
        }
    }

}));