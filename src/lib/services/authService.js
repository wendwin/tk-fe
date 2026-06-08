import request from "@/lib/api";

export const checkAuth = async () => {
  try {
    await request("/auth/me");
    return true;
  } catch {
    return false;
  }
};

export const register = (data) => {
  return request("/auth/register", {
    method: "POST",
    body: data,
  });
};

export const login = (data) => {
  return request("/auth/login", {
    method: "POST",
    body: data,
    credentials: "include",
  });
};

export const logout = () => {
  return request("/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const forgotPassword = async (payload) => {
  return await request("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
};

export const resetPassword = async (payload) => {
  return await request("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
};
