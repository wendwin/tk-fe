<template>
  <div>
    <h1>Portal Pendaftaran</h1>

    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { logout } from "@/lib/services/authService";

const router = useRouter();

const handleLogout = async () => {
  try {
    await logout();

    sessionStorage.removeItem("csrf_token");
    router.push("/login");
  } catch (err) {
    console.log(err.message);
  }
};
</script>

<style lang="scss" scoped></style>
