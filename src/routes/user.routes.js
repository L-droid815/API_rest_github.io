/**
 * ==============================================================================
 * CAPA: RUTAS (Routes)
 * ==============================================================================
 * Mapea cada endpoint y método HTTP directamente con su función controladora.
 * ==============================================================================
 */

import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = Router();

// 1. READ ALL -> Obtener todos los usuarios
router.get('/', getAllUsers);

// 2. READ BY ID -> Obtener un usuario específico
router.get('/:id', getUserById);

// 3. CREATE -> Crear un nuevo usuario
router.post('/', createUser);

// 4. UPDATE -> Modificar un usuario existente
router.put('/:id', updateUser);

// 5. DELETE -> Eliminar un usuario
router.delete('/:id', deleteUser);

export default router;
