import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { Usuario } from "../services/auth";

interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: { usuario: Usuario; token: string } }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  usuario: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return { token: action.payload.token, usuario: action.payload.usuario, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { token: null, usuario: null, isAuthenticated: false };
    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.token && !state.usuario) {
      import("../services/auth").then(({ getMe }) => {
        getMe()
          .then((usuario) => dispatch({ type: "LOGIN", payload: { usuario, token: state.token! } }))
          .catch(() => dispatch({ type: "LOGOUT" }));
      });
    }
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
