# 🕹️ Controladores (`src/controllers/`)

Aquí se procesa la petición (`req`), se interactúa con **Prisma** y se devuelve la respuesta JSON (`res`).

## 📂 Archivos

* **`user.controller.js`**: Ejemplo funcional de referencia (en memoria).
* **`<tu-entidad>.controller.js`**: Archivo que debes crear para tu nuevo recurso.

## 📝 Estructura a seguir (Funciones individuales)

Importa `PrismaClient` y exporta una función por cada operación:

```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 1. Obtener todos
export const getAll = async (req, res) => {
  const data = await prisma.<tuEntidad>.findMany();
  res.json({ success: true, data });
};

// 2. Obtener por ID
export const getById = async (req, res) => {
  const { id } = req.params;
  const item = await prisma.<tuEntidad>.findUnique({ where: { id: Number(id) } });
  if (!item) return res.status(404).json({ success: false, message: 'No encontrado' });
  res.json({ success: true, data: item });
};

// 3. Crear
export const create = async (req, res) => {
  const nuevo = await prisma.<tuEntidad>.create({ data: req.body });
  res.status(201).json({ success: true, data: nuevo });
};

// 4. Actualizar
export const update = async (req, res) => {
  const { id } = req.params;
  const modificado = await prisma.<tuEntidad>.update({ where: { id: Number(id) }, data: req.body });
  res.json({ success: true, data: modificado });
};

// 5. Eliminar
export const remove = async (req, res) => {
  const { id } = req.params;
  await prisma.<tuEntidad>.delete({ where: { id: Number(id) } });
  res.json({ success: true, message: 'Eliminado correctamente' });
};
```
