export const statusConfig = (status) => {
  switch (status) {
    case "pending":
      return {
        label: "pending",
        class: "text-yellow-600",
      };
    case "verified":
      return {
        label: "terverifikasi",
        class: "text-blue-600",
      };
    case "accepted":
      return {
        label: "diterima",
        class: "text-green-600",
      };
    case "rejected":
      return {
        label: "ditolak",
        class: "text-red-600",
      };
    default:
      return {
        label: status,
        class: "text-gray-600",
      };
  }
};

export const paymentConfig = (status) => {
  switch (status) {
    case "unpaid":
      return {
        label: "belum bayar",
        class: "text-red-600",
      };
    case "pending":
      return {
        label: "pending",
        class: "text-yellow-600",
      };
    case "paid":
      return {
        label: "lunas",
        class: "text-green-600",
      };
    case "failed":
      return {
        label: "gagal",
        class: "text-red-600",
      };
    default:
      return {
        label: status,
        class: "text-gray-600",
      };
  }
};
