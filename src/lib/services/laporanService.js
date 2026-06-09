import { showError } from "@/lib/utils/toast";

export const downloadLaporanKepsek = async (tahunAjaranId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/laporan/export-pdf?tahun_ajaran_id=${tahunAjaranId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Gagal download laporan");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "laporan_kepala_sekolah.pdf";

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};
