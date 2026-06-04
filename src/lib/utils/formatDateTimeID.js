export default function formatDateTimeID(date, options = { withTime: true }) {
  if (!date) return "-";

  const d = new Date(date);

  if (isNaN(d)) return "-";

  const tanggal = d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (!options.withTime) {
    return tanggal;
  }

  const waktu = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${tanggal} ${waktu}`;
}

export function formatPeriodeID(startDate, endDate) {
  if (!startDate || !endDate) return "-";

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) return "-";

  const startFormatted = start.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const endFormatted = end.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `${startFormatted} - ${endFormatted}`;
}
