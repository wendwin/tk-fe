// lib/api.js
const BASE_URL = import.meta.env.VITE_API_URL;

const normalizeErrors = (errors) => {
  if (!errors) return {};

  const result = {};

  Object.keys(errors).forEach((key) => {
    result[key] = Array.isArray(errors[key]) ? errors[key] : [errors[key]];
  });

  return result;
};

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

  let response = await fetch(url, config);

  // refresh token
  if (response.status === 401 && !endpoint.startsWith("/auth/")) {
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken || "",
      },
      credentials: "include",
    });

    if (refreshRes.ok) {
      const newCsrf = refreshRes.headers.get("X-CSRF-TOKEN");
      if (newCsrf) {
        sessionStorage.setItem("csrf_token", newCsrf);
        config.headers["X-CSRF-TOKEN"] = newCsrf;
      }

      response = await fetch(url, config);
    } else {
      throw new Error("Session expired");
    }
  }

  const csrfFromHeader = response.headers.get("X-CSRF-TOKEN");
  if (csrfFromHeader) {
    sessionStorage.setItem("csrf_token", csrfFromHeader);
  }

  console.log("CSRF Header:", csrfFromHeader);
  console.log("CSRF Token:", sessionStorage.getItem("csrf_token"));

  let result;
  try {
    result = await response.json();
  } catch {
    result = {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }

  if (!response.ok || result.success === false) {
    throw {
      message: result.message || "Terjadi kesalahan",
      errors: normalizeErrors(result.errors),
      code: response.status,
    };
  }

  return result;
};

export default request;
