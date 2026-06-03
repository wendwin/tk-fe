import request from "@/lib/api";

export const getPertanyaanAsesmen = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  return request(`/asesmen/pertanyaan${query ? `?${query}` : ""}`, {
    method: "GET",
  });
};

export const getPertanyaanAsesmenAktif = async () => {
  return request("/asesmen/pertanyaan?active_only=true", {
    method: "GET",
  });
};

export const createPertanyaanAsesmen = async (payload) => {
  return request("/asesmen/pertanyaan", {
    method: "POST",
    body: payload,
  });
};

export const updatePertanyaanAsesmen = async (id, payload) => {
  return request(`/asesmen/pertanyaan/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const nonaktifkanPertanyaanAsesmen = async (id) => {
  return request(`/asesmen/pertanyaan/${id}`, {
    method: "DELETE",
  });
};

export const aktifkanPertanyaanAsesmen = async (id) => {
  return request(`/asesmen/pertanyaan/${id}/restore`, {
    method: "PUT",
  });
};

export const createJawabanAsesmen = async (payload) => {
  return request("/asesmen/jawaban", {
    method: "POST",
    body: payload,
  });
};

export const getJawabanAsesmen = async (id) => {
  return request(`/asesmen/jawaban/${id}`, {
    method: "GET",
  });
};

export const deleteJawabanAsesmen = async (id) => {
  return request(`/asesmen/jawaban/${id}`, {
    method: "DELETE",
  });
};
