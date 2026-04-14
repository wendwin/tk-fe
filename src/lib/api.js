// lib/api.js
const BASE_URL = import.meta.env.VITE_API_URL;

const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const csrfToken = sessionStorage.getItem("csrf_token");

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken || "",
      ...options.headers,
    },
    credentials: "include",
    ...options,
  };

  if (
    config.body &&
    typeof config.body === "object" &&
    !(config.body instanceof FormData)
  ) {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);

  const csrfFromHeader = response.headers.get("X-CSRF-TOKEN");
  if (csrfFromHeader) {
    sessionStorage.setItem("csrf_token", csrfFromHeader);
  }

  let result;
  try {
    result = await response.json();
  } catch {
    result = {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }

  if (response.status === 401) {
    window.location.href = "/login";
    throw new Error(result.message || "Unauthorized");
  }

  if (!response.ok || result.success === false) {
    throw {
      message: result.message || "Terjadi kesalahan",
      errors: result.errors || null,
    };
  }

  return result;
};

export default request;
