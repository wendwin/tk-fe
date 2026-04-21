export const setPendaftaranId = (id) => {
  sessionStorage.setItem("pendaftaran_id", id);
};

export const getPendaftaranId = () => {
  return sessionStorage.getItem("pendaftaran_id");
};

export const clearPendaftaranId = () => {
  sessionStorage.removeItem("pendaftaran_id");
};
