export function formatDateTimeID(date, options = { withTime: true }) {
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

  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  const sameYear = start.getFullYear() === end.getFullYear();

  // 27 Juli - 31 Juli 2026
  if (sameMonth) {
    const startDay = start.toLocaleDateString("id-ID", {
      day: "2-digit",
    });

    const endFormatted = end.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return `${startDay} - ${endFormatted}`;
  }

  // 27 Juli - 02 Agustus 2026
  if (sameYear) {
    const startFormatted = start.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
    });

    const endFormatted = end.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return `${startFormatted} - ${endFormatted}`;
  }

  // beda tahun
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
