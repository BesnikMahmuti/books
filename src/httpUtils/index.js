import axios from "axios";

export const GET = async (url, config) => {
  if (!url) return new Error("Please provide a url.");

  if (
    !config ||
    (config && typeof config !== "string" && !Object.keys(config).length)
  ) {
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const { data = [] } = await axios.get(url, config);

  return data;
};

export const DELETE = async (url, config) => {
  if (!url) return new Error("Please provide a url.");

  if (
    !config ||
    (config && typeof config !== "string" && !Object.keys(config).length)
  ) {
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const { data = [] } = await axios.delete(url, config);

  return data;
};

export const POST = async (url, config, body = {}) => {
  if (!url) return new Error("Please provide a url.");

  if (
    !config ||
    (config && typeof config !== "string" && !Object.keys(config).length)
  ) {
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const { data = [] } = axios.post(url, body, config);

  return data;
};

export const PUT = async (url, config, body = {}) => {
  if (!url) return new Error("Please provide a url.");

  if (
    !config ||
    (config && typeof config !== "string" && !Object.keys(config).length)
  ) {
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const { data = [] } = axios.put(url, body, config);

  return data;
};
