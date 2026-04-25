import request from "@/lib/api";

export const getPertanyaanAsesmen = async () => {
  return request("/asesmen/pertanyaan", {
    method: "GET",
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
