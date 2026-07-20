import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    ChecKLoading: false,
    SignupLoading: false,
    LoginLoading: false,
    LogoutLoading: false,

    check: async () => {
        set({ ChecKLoading: true });
        try {
            const res = await axiosInstance.get("/admin/check");
            set({ authUser: res.data.data });
        } catch (error) {
            console.log("Error in Auth: ", error);
            set({ authUser: null });
        } finally {
            set({ ChecKLoading: false });
        }
    },

    signup: async (data) => {
        set({ SignupLoading: true })
        try {
            const res = await axiosInstance.post("/admin/signup", data);
            set({ authUser: res.data.data });

            toast.success("Signup Successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ SignupLoading: false })
        }
    },

    login: async (data) => {
        set({ LoginLoading: true })
        try {
            const res = await axiosInstance.post("/admin/login", data);
            set({ authUser: res.data.data });

            toast.success("Login Successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ LoginLoading: false })
        }
    },

    logout: async () => {
        set({ LogoutLoading: true });
        try {
            await axiosInstance.post("/admin/logout");
            set({ authUser: null });

            toast.success("Logout successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ LogoutLoading: false });
        }
    }
}));