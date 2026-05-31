import request from "@/lib/api";

export const getPortalMonitoring = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  return request(`/monitoring/siswa/portal${query ? `?${query}` : ""}`);
};

export const getPortalMonitoringById = async (id) => {
  return request(`/monitoring/siswa/${id}`);
};
