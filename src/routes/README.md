# 🛣️ Rutas (`src/routes/`)

Define los endpoints de la API y vincula cada método HTTP (`GET`, `POST`, `PUT`, `DELETE`) con su controlador.

## 📂 Archivos

* **`index.routes.js`**: Enrutador central que monta todas las rutas de la API.
* **`user.routes.js`**: Rutas de ejemplo para `/api/users`.
* **`<tu-entidad>.routes.js`**: Archivo que debes crear para tu nuevo recurso.

## 📝 Lo que debes hacer

### 1. Crear `src/routes/<tu-entidad>.routes.js`:
```javascript
import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/<tu-entidad>.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
```

### 2. Registrarlo en `src/routes/index.routes.js`:
```javascript
import miEntidadRoutes from './<tu-entidad>.routes.js';

router.use('/api/<tu-entidad>', miEntidadRoutes);
```
