import request from "@/lib/api";

export const getAllGuruKelas = async () => {
  return await request("/akademik/guru-kelas");
};

export const getGuruKelasById = async (id) => {
  return await request(`/akademik/guru-kelas/${id}`);
};

export const getMyGuruKelas = async () => {
  return await request("/akademik/guru-kelas/me");
};

export const createGuruKelas = async (payload) => {
  return await request("/akademik/guru-kelas", {
    method: "POST",
    body: payload,
  });
};

export const updateGuruKelas = async (id, payload) => {
  return await request(`/akademik/guru-kelas/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteGuruKelas = async (id) => {
  return await request(`/akademik/guru-kelas/${id}`, {
    method: "DELETE",
  });
};
