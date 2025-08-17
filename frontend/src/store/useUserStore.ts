import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  // Add this ones during edit profile
  profileImg: string;
  bio: string;
  location: string;
  github: string;
  website: string;
}

interface userState {
  authUser: IUser | null;
  isCheckingAuth: boolean;
  isLoggingIn: boolean;
  isSigningUp: boolean;

  checkAuth: () => Promise<void>;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  signup: ({ username, email, password }) => Promise<void>;
}

export const useUserStore = create<userState>()(
  (set): userState => ({
    // initial states
    authUser: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningUp: false,

    checkAuth: async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/check`);

        set({ authUser: response.data });
      } catch (error) {
        console.log("Error in checkAuth: ", error);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    login: async ({ email, password }) => {
      set({ isLoggingIn: true });

      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
        });

        set({ authUser: response.data });
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isLoggingIn: false });
      }
    },

    logout: async () => {
      try {
        await axios.post(`${API_URL}/auth/logout`);
        set({ authUser: null });
        toast.success("Logged out successfully");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    signup: async ({ username, email, password }) => {
      set({ isSigningUp: true });

      try {
        const response = await axios.post(`${API_URL}/auth/signup`, {
          username,
          email,
          password,
        });

        set({ authUser: response.data });
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isSigningUp: false });
      }
    },
  })
);
