import request from "@/lib/api";

export const getGuruUsers = async () => {
  return await request("/users?role=guru");
};
