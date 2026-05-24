import request from "@/lib/api";

export const getAllSiswa = async (query = "") => {
  return await request(`/akademik/siswa${query}`);
};

export const getSiswaById = async (id) => {
  return await request(`/akademik/siswa/${id}`);
};

export const updateSiswa = async (id, payload) => {
  return await request(`/akademik/siswa/${id}`, {
    method: "PUT",
    body: payload,
  });
};
