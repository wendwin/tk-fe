import request from "@/lib/api";

export const getMonitoringMingguan = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/monitoring/mingguan${query ? `?${query}` : ""}`);
};

export const getMonitoringMingguanById = async (id) => {
  return request(`/monitoring/mingguan/${id}`);
};

export const createMonitoringMingguan = async (payload) => {
  return request("/monitoring/mingguan", {
    method: "POST",
    body: payload,
  });
};

export const updateMonitoringMingguan = async (id, payload) => {
  return request(`/monitoring/mingguan/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const publishMonitoringMingguan = async (id) => {
  return request(`/monitoring/mingguan/${id}/publish`, {
    method: "PUT",
  });
};

// monitoring siswa
export const getMonitoringSiswa = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  return request(`/monitoring/siswa${query ? `?${query}` : ""}`);
};

export const getMonitoringSiswaById = async (id) => {
  return request(`/monitoring/siswa/${id}`);
};

export const createMonitoringSiswa = async (payload) => {
  return request("/monitoring/siswa", {
    method: "POST",
    body: payload,
  });
};

export const updateMonitoringSiswa = async (id, payload) => {
  return request(`/monitoring/siswa/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const publishMonitoringSiswa = async (id) => {
  return request(`/monitoring/siswa/${id}/publish`, {
    method: "PUT",
  });
};
