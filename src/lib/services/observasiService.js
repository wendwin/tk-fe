import request from "@/lib/api";

export const getObservasi = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  return await request(`/observasi${query ? `?${query}` : ""}`);
};

export const setJadwalObservasi = async (payload) => {
  return await request("/observasi/set-jadwal", {
    method: "PUT",
    body: payload,
  });
};

export const getMasterPertanyaanGpph = async () => {
  return await request("/observasi/gpph/pertanyaan");
};

export const getPertanyaanGpph = async () => {
  return await request("/observasi/gpph/pertanyaan?active_only=true");
};

export const createMasterPertanyaanGpph = async (payload) => {
  return await request("/observasi/gpph/pertanyaan", {
    method: "POST",
    body: payload,
  });
};

export const updateMasterPertanyaanGpph = async (id, payload) => {
  return await request(`/observasi/gpph/pertanyaan/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const nonaktifkanMasterPertanyaanGpph = async (id) => {
  return await request(`/observasi/gpph/pertanyaan/${id}`, {
    method: "DELETE",
  });
};

export const aktifkanMasterPertanyaanGpph = async (id) => {
  return await request(`/observasi/gpph/pertanyaan/${id}/restore`, {
    method: "PUT",
  });
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

export const getMasterPertanyaanKpsp = async () => {
  return await request("/observasi/kpsp/pertanyaan");
};

export const createMasterPertanyaanKpsp = async (payload) => {
  return await request("/observasi/kpsp/pertanyaan", {
    method: "POST",
    body: payload,
  });
};

export const updateMasterPertanyaanKpsp = async (id, payload) => {
  return await request(`/observasi/kpsp/pertanyaan/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const nonaktifkanMasterPertanyaanKpsp = async (id) => {
  return await request(`/observasi/kpsp/pertanyaan/${id}`, {
    method: "DELETE",
  });
};

export const aktifkanMasterPertanyaanKpsp = async (id) => {
  return await request(`/observasi/kpsp/pertanyaan/${id}/restore`, {
    method: "PUT",
  });
};
