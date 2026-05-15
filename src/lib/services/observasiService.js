import request from "@/lib/api";

export const setJadwalObservasi = async (payload) => {
  return await request("/observasi/set-jadwal", {
    method: "PUT",
    body: payload,
  });
};

export const getPertanyaanGpph = async () => {
  return await request("/observasi/gpph/pertanyaan");
};

export const createObservasiGpph = async (pendaftaranId, payload) => {
  return await request(`/observasi/${pendaftaranId}/gpph`, {
    method: "POST",
    body: payload,
  });
};

export const getHasilObservasiGpph = async (pendaftaranId) => {
  return await request(`/observasi/${pendaftaranId}/gpph`);
};

export const getPertanyaanKpsp = async (pendaftaranId) => {
  return await request(`/observasi/${pendaftaranId}/kpsp/soal`);
};

export const createObservasiKpsp = async (pendaftaranId, payload) => {
  return await request(`/observasi/${pendaftaranId}/kpsp`, {
    method: "POST",
    body: payload,
  });
};

export const getHasilObservasiKpsp = async (pendaftaranId) => {
  return await request(`/observasi/${pendaftaranId}/kpsp`);
};
