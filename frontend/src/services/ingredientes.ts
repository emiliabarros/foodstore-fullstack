import api from "./api";

export interface Ingrediente {
  id: number;
  nombre: string;
  descripcion: string | null;
  es_alergeno: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface IngredienteCreate {
  nombre: string;
  descripcion?: string;
  es_alergeno: boolean;
}

export interface IngredienteListParams {
  nombre?: string;
  es_alergeno?: boolean;
  incluir_eliminados?: boolean;
  skip?: number;
  limit?: number;
}

export const getIngredientes = async (params: IngredienteListParams = {}) => {
  const res = await api.get("/ingredientes/", { params });
  return res.data as { total: number; items: Ingrediente[] };
};

export const getIngrediente = async (id: number) => {
  const res = await api.get(`/ingredientes/${id}`);
  return res.data as Ingrediente;
};

export const createIngrediente = async (data: IngredienteCreate) => {
  const res = await api.post("/ingredientes/", data);
  return res.data as Ingrediente;
};

export const updateIngrediente = async (id: number, data: Partial<IngredienteCreate>) => {
  const res = await api.patch(`/ingredientes/${id}`, data);
  return res.data as Ingrediente;
};

export const deleteIngrediente = async (id: number) => {
  await api.delete(`/ingredientes/${id}`);
};

export const reactivarIngrediente = async (id: number) => {
  const res = await api.patch(`/ingredientes/${id}/reactivar`);
  return res.data as Ingrediente;
};
