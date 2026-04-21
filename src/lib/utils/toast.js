import { toast } from "vue3-toastify";

export const showSuccess = (msg) => {
  toast.success(msg, {
    autoClose: 3000,
    position: "top-right",
  });
};

export const showError = (msg) => {
  toast.error(msg, {
    autoClose: 3000,
    position: "top-right",
  });
};

export const showWarning = (msg) => {
  toast.warning(msg, {
    autoClose: 3000,
    position: "top-right",
  });
};

export const showInfo = (msg) => {
  toast.info(msg, {
    autoClose: 3000,
    position: "top-right",
  });
};
