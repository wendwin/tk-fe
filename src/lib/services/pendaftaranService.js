import request from "@/lib/api";

export const createPendaftaran = async (payload) => {
  return request("/pendaftaran", {
    method: "POST",
    body: payload,
  });
};

export const updatePendaftaran = (id, payload) => {
  return request(`/pendaftaran/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const uploadBerkas = async (id, files) => {
  const formData = new FormData();

  if (files.kk) formData.append("kk", files.kk);
  if (files.foto) formData.append("foto", files.foto);
  if (files.kia) formData.append("kia", files.kia);
  if (files.akta) formData.append("akta", files.akta);
  if (files.surat_pernyataan)
    formData.append("surat_pernyataan", files.surat_pernyataan);

  return request(`/pendaftaran/${id}/upload-berkas`, {
    method: "POST",
    body: formData,
  });
};

export const uploadPembayaran = (id, formData) => {
  return request(`/pendaftaran/${id}/upload-pembayaran`, {
    method: "POST",
    body: formData,
  });
};

export const getAllPendaftaran = (query = "") => {
  return request(`/pendaftaran${query}`, {
    method: "GET",
  });
};

export const getPendaftaranById = (id) => {
  return request(`/pendaftaran/${id}`, {
    method: "GET",
  });
};

export const getMyPendaftaran = () => {
  return request("/pendaftaran/me", {
    method: "GET",
  });
};

export const updateStatusPendaftaran = (id, status) => {
  return request(`/pendaftaran/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
};

export const updateStatusPembayaran = (id, status) => {
  return request(`/pendaftaran/${id}/status-pembayaran`, {
    method: "PATCH",
    body: {
      status_pembayaran: status,
    },
  });
};

export const downloadSuratPernyataan = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/pendaftaran/download-surat-pernyataan`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Gagal download surat pernyataan");
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "surat_pernyataan.pdf";

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

export const setJadwalObservasi = async (payload) => {
  return await request("/observasi/set-jadwal", {
    method: "PUT",
    body: payload,
  });
};
