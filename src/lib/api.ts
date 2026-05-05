import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetcher = <T>(url: string): Promise<T> =>
  api.get<T>(url).then((res) => res.data);

export default api;
