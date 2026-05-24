import request from "@/lib/api";

export const getAllKelas = async () => {
  return await request("/akademik/kelas");
};

export const getKelasById = async (id) => {
  return await request(`/akademik/kelas/${id}`);
};

export const createKelas = async (payload) => {
  return await request("/akademik/kelas", {
    method: "POST",
    body: payload,
  });
};

export const updateKelas = async (id, payload) => {
  return await request(`/akademik/kelas/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteKelas = async (id) => {
  return await request(`/akademik/kelas/${id}`, {
    method: "DELETE",
  });
};
