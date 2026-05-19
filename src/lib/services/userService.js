import request from "@/lib/api";

export const getAllUsers = async (query = "") => {
  return await request(`/users${query}`);
};

export const getGuruUsers = async () => {
  return await request("/users?role=guru");
};

export const getUserById = async (id) => {
  return await request(`/users/${id}`);
};

export const createUser = async (payload) => {
  return await request("/users", {
    method: "POST",
    body: payload,
  });
};

export const updateUser = async (id, payload) => {
  return await request(`/users/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteUser = async (id) => {
  return await request(`/users/${id}`, {
    method: "DELETE",
  });
};
