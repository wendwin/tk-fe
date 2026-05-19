import request from "@/lib/api";

export const getAllTahunAjaran = async () => {
  return await request("/tahun-ajaran");
};
