<template>
  <div>
    <h1>Admin Dashboard</h1>

    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { logout } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const handleLogout = async () => {
  try {
    await logout();

    auth.clearAuth();
    sessionStorage.removeItem("csrf_token");

    router.push("/login");
  } catch (err) {
    console.log(err.message);
  }
};
</script>

<style lang="scss" scoped></style>
