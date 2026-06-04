import request from "@/lib/api";

export const getGelombangByTahunAjaran = async (tahunAjaranId) => {
  return await request(`/gelombang/tahun-ajaran/${tahunAjaranId}`);
};

export const createGelombang = async (payload) => {
  return await request("/gelombang", {
    method: "POST",
    body: payload,
  });
};

export const updateGelombang = async (id, payload) => {
  return await request(`/gelombang/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteGelombang = async (id) => {
  return await request(`/gelombang/${id}`, {
    method: "DELETE",
  });
};
