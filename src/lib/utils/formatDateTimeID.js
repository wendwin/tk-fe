export default function formatDateTimeID(date) {
  if (!date) return "-";

  const d = new Date(date);
  if (isNaN(d)) return "-";

  const tanggal = d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const waktu = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${tanggal} ${waktu}`;
}
