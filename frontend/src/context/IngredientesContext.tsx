import { createContext, useContext, useReducer, ReactNode } from "react";
import { Ingrediente } from "../services/ingredientes";

interface FiltrosState {
  nombre: string;
  esAlergeno: "" | "true" | "false";
  incluirEliminados: boolean;
}

interface IngredientesState {
  ingredientes: Ingrediente[];
  total: number;
  skip: number;
  limit: number;
  filtros: FiltrosState;
  loading: boolean;
}

type IngredientesAction =
  | { type: "SET_INGREDIENTES"; payload: { ingredientes: Ingrediente[]; total: number } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_FILTRO_NOMBRE"; payload: string }
  | { type: "SET_FILTRO_ALERGENO"; payload: "" | "true" | "false" }
  | { type: "SET_INCLUIR_ELIMINADOS"; payload: boolean }
  | { type: "SET_SKIP"; payload: number }
  | { type: "RESET_FILTROS" };

const initialState: IngredientesState = {
  ingredientes: [],
  total: 0,
  skip: 0,
  limit: 5,
  filtros: { nombre: "", esAlergeno: "", incluirEliminados: false },
  loading: false,
};

function ingredientesReducer(state: IngredientesState, action: IngredientesAction): IngredientesState {
  switch (action.type) {
    case "SET_INGREDIENTES":
      return { ...state, ingredientes: action.payload.ingredientes, total: action.payload.total };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_FILTRO_NOMBRE":
      return { ...state, filtros: { ...state.filtros, nombre: action.payload }, skip: 0 };
    case "SET_FILTRO_ALERGENO":
      return { ...state, filtros: { ...state.filtros, esAlergeno: action.payload }, skip: 0 };
    case "SET_INCLUIR_ELIMINADOS":
      return { ...state, filtros: { ...state.filtros, incluirEliminados: action.payload }, skip: 0 };
    case "SET_SKIP":
      return { ...state, skip: action.payload };
    case "RESET_FILTROS":
      return { ...state, filtros: { nombre: "", esAlergeno: "", incluirEliminados: false }, skip: 0 };
    default:
      return state;
  }
}

interface IngredientesContextType {
  state: IngredientesState;
  dispatch: React.Dispatch<IngredientesAction>;
}

const IngredientesContext = createContext<IngredientesContextType | undefined>(undefined);

export function IngredientesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ingredientesReducer, initialState);
  return <IngredientesContext.Provider value={{ state, dispatch }}>{children}</IngredientesContext.Provider>;
}

export function useIngredientes() {
  const ctx = useContext(IngredientesContext);
  if (!ctx) throw new Error("useIngredientes debe usarse dentro de IngredientesProvider");
  return ctx;
}
