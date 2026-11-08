# 🚀 Ejercicio: Backend Express + Prisma ORM

Plantilla base para construir una API REST con **Express** e integrar **Prisma ORM** con SQLite desde cero. Incluye un módulo de referencia funcional (`/api/users`) en memoria.

---

## 🎯 El Reto

No modifiques el módulo `Users`. Tu objetivo es crear una **nueva entidad distinta** (ej: `Product`, `Task`, `Book`, etc.), configurar Prisma, correr la migración e implementar sus 4 operaciones CRUD (Create, Read, Update, Delete).

---

## 📁 Estructura del Proyecto

```text
plantilla/
├── prisma/                         # Creado por Prisma (schema.prisma + migraciones)
├── src/
│   ├── controllers/
│   │   ├── user.controller.js      # Ejemplo de referencia (en memoria)
│   │   └── <tu-entidad>.controller.js # [CREAR] Controlador con Prisma
│   ├── routes/
│   │   ├── index.routes.js         # Enrutador central
│   │   ├── user.routes.js          # Rutas del ejemplo
│   │   └── <tu-entidad>.routes.js  # [CREAR] Rutas de tu entidad
│   ├── app.js                      # Configuración de Express
│   └── server.js                   # Arranque del servidor
├── package.json
└── README.md
```

---

## 🛠️ Pasos para Resolver el Ejercicio

### 1. Iniciar y probar el ejemplo existente
```bash
npm install
npm run dev
```
Prueba en Postman o en el navegador: `GET http://localhost:3000/api/users` (te devolverá la lista de usuarios en memoria).

### 2. Instalar e inicializar Prisma
```bash
npm install @prisma/client
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
```

### 3. Definir tu modelo y migrar
En `prisma/schema.prisma`, añade tu entidad (ej: `Product` con `name`, `price`, `stock`, etc.) y ejecuta:
```bash
npx prisma migrate dev --name init
```
*(Tip: corre `npx prisma studio` en otra terminal para ver tus tablas en el navegador).*

### 4. Crear el Controlador (`src/controllers/<tu-entidad>.controller.js`)
Importa Prisma (`import { PrismaClient } from '@prisma/client'`) y exporta las funciones:
* `getAll...`: `prisma.<tuEntidad>.findMany()`
* `get...ById`: `prisma.<tuEntidad>.findUnique(...)`
* `create...`: `prisma.<tuEntidad>.create(...)`
* `update...`: `prisma.<tuEntidad>.update(...)`
* `delete...`: `prisma.<tuEntidad>.delete(...)`

### 5. Crear las Rutas (`src/routes/<tu-entidad>.routes.js`)
Mapea los endpoints (`GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`) y monta el enrutador en `src/routes/index.routes.js`.

---

## 📡 Endpoints a Probar

| Método   | Endpoint                | Acción              | Código éxito     |
| :------- | :---------------------- | :------------------ | :--------------- |
| `GET`    | `/api/<tu-entidad>`     | Listar todos        | `200 OK`         |
| `GET`    | `/api/<tu-entidad>/:id` | Buscar por ID       | `200 OK` / `404` |
| `POST`   | `/api/<tu-entidad>`     | Crear registro      | `201 Created`    |
| `PUT`    | `/api/<tu-entidad>/:id` | Actualizar registro | `200 OK`         |
| `DELETE` | `/api/<tu-entidad>/:id` | Eliminar registro   | `200 OK`         |
