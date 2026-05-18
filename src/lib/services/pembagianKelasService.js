import request from "@/lib/api";

export const getAllKelas = async () => {
  return await request("/akademik/kelas");
};

export const getSiswaBelumMasukKelas = async (query = "") => {
  return await request(`/akademik/siswa-kelas/unassigned${query}`);
};

export const getRekomendasiSiswaKelas = async (query = "") => {
  return await request(`/akademik/siswa-kelas/rekomendasi${query}`);
};

export const getSiswaDalamKelas = async (query = "") => {
  return await request(`/akademik/siswa-kelas${query}`);
};

export const bulkAssignSiswaKelas = async (payload) => {
  return await request("/akademik/siswa-kelas/bulk", {
    method: "POST",
    body: payload,
  });
};
