import request from "@/lib/api";

export const createPendaftaran = async (payload) => {
  return request("/pendaftaran", {
    method: "POST",
    body: payload,
  });
};
