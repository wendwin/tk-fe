// stores/auth.js
import { defineStore } from "pinia";
import request from "@/lib/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isLoaded: false,
    isLoading: false,
  }),

  actions: {
    async fetchUser() {
      if (this.isLoaded || this.isLoading) return;

      this.isLoading = true;

      try {
        const res = await request("/auth/me");
        this.user = res.data;
        this.isAuthenticated = true;
      } catch {
        this.user = null;
        this.isAuthenticated = false;
      } finally {
        this.isLoaded = true;
        this.isLoading = false;
      }
    },

    setAuth(user) {
      this.user = user;
      this.isAuthenticated = true;
      this.isLoaded = true;
    },

    clearAuth() {
      this.user = null;
      this.isAuthenticated = false;
      this.isLoaded = true;
    },
  },
});
