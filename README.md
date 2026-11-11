# Food Store — API REST + SPA (FastAPI · React · PostgreSQL)

Aplicación full stack con autenticación JWT y gestión de ingredientes para una tienda de comidas. Es la primera entrega de un trabajo integrador: backend en capas con patrón *Unit of Work* y frontend en React + TypeScript conectado a la API.

## Stack

| Capa | Tecnologías |
|---|---|
| Backend | Python, FastAPI, SQLModel, PostgreSQL, Pydantic v2 |
| Seguridad | JWT (`python-jose`), hash de contraseñas con bcrypt (`passlib`) |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, React Router, Axios, Context API |

## Funcionalidades

- Registro e inicio de sesión de usuarios; el login devuelve un token JWT.
- Rutas protegidas con `Authorization: Bearer <token>`.
- CRUD de ingredientes con **borrado lógico** (`deleted_at`) y endpoint de **reactivación**.
- Listado con **paginación** (`skip` / `limit`), filtro por **nombre** y por **alérgeno**, y opción para incluir eliminados. La respuesta incluye el total (`{ total, items }`).
- Validaciones con Pydantic y respuesta `409` si el nombre del ingrediente ya existe.
- Frontend con login, tabla de ingredientes, filtros, paginación, modal de alta/edición y navegación. El interceptor de Axios agrega el token a cada request y redirige al login ante un `401`.
- Documentación interactiva automática con Swagger.

## Arquitectura del backend

Separación en capas: cada una conoce solo a la siguiente.

```
backend/app/
├── main.py            # App FastAPI, CORS, creación de tablas al iniciar
├── database.py        # Engine y sesiones
├── core/security.py   # Hash de contraseñas y manejo de JWT
├── models/            # Entidades SQLModel (Usuario, Ingrediente)
├── schemas/           # DTOs de entrada/salida (Pydantic)
├── repositories/      # Acceso a datos
├── services/          # Lógica de negocio y manejo de errores HTTP
├── routers/           # Endpoints
└── uow/uow.py         # Unit of Work: una transacción por operación (commit/rollback)
```

## Endpoints

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/register` | Registrar usuario | No |
| POST | `/auth/login` | Iniciar sesión → JWT | No |
| GET | `/auth/me` | Usuario actual | Sí |
| GET | `/ingredientes/` | Listar con filtros y paginación | Sí |
| POST | `/ingredientes/` | Crear ingrediente | Sí |
| GET | `/ingredientes/{id}` | Obtener por ID | Sí |
| PATCH | `/ingredientes/{id}` | Actualización parcial | Sí |
| DELETE | `/ingredientes/{id}` | Borrado lógico | Sí |
| PATCH | `/ingredientes/{id}/reactivar` | Reactivar ingrediente eliminado | Sí |

## Cómo correrlo

### Requisitos

Python 3.10+, Node.js 18+ y PostgreSQL.

### Backend

```bash
# 1. Crear la base de datos
psql -U postgres -c "CREATE DATABASE foodstore;"

# 2. Configurar variables de entorno
cd backend
cp .env.example .env
# Editar .env: contraseña de PostgreSQL y una SECRET_KEY propia

# 3. Instalar dependencias y levantar la API
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Swagger: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173 (el backend ya permite ese origen por CORS).

## Alcance actual

- Implementado: autenticación y módulo de ingredientes.
- El modelo de usuario ya contempla roles (`cliente`, `gestor`, `admin`, `repartidor`), pero todavía no se restringen endpoints por rol.
- Sin tests automatizados por el momento.

