import request from "@/lib/api";

export const getAllTahunAjaran = async () => {
  return await request("/tahun-ajaran");
};

export const getActiveTahunAjaran = async () => {
  return await request("/tahun-ajaran/active");
};

export const getTahunAjaranById = async (id) => {
  return await request(`/tahun-ajaran/${id}`);
};

export const createTahunAjaran = async (payload) => {
  return await request("/tahun-ajaran", {
    method: "POST",
    body: payload,
  });
};

export const updateTahunAjaran = async (id, payload) => {
  return await request(`/tahun-ajaran/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteTahunAjaran = async (id) => {
  return await request(`/tahun-ajaran/${id}`, {
    method: "DELETE",
  });
};
