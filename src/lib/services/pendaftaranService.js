import request from "@/lib/api";

export const createPendaftaran = async (payload) => {
  return request("/pendaftaran", {
    method: "POST",
    body: payload,
  });
};

export const uploadBerkas = async (id, files) => {
  const formData = new FormData();

  if (files.kk) formData.append("kk", files.kk);
  if (files.foto) formData.append("foto", files.foto);
  if (files.kia) formData.append("kia", files.kia);
  if (files.akta) formData.append("akta", files.akta);

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
