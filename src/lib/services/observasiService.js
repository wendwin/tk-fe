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

export const createObservasiGpph = async (payload) => {
  return await request("/observasi/gpph", {
    method: "POST",
    body: payload,
  });
};
