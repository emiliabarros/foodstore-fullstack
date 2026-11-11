import api from "./api";

export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { nombre: string; email: string; password: string; }
export interface Usuario { id: number; nombre: string; email: string; rol: string; }

export const login = async (data: LoginRequest) => {
  const res = await api.post("/auth/login", data);
  localStorage.setItem("token", res.data.access_token);
  return res.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const getMe = async (): Promise<Usuario> => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
