/**
 * ==============================================================================
 * CONTROLADOR DE REFERENCIA: Usuarios (user.controller.js)
 * ==============================================================================
 * Este archivo sirve como EJEMPLO FUNCIONAL en memoria.
 * 
 * En este archivo de ejemplo usamos un arreglo de JavaScript para que el servidor
 * funcione de inmediato y puedas probar cómo se reciben peticiones y cómo se
 * responde con JSON.
 * 
 * 🎯 TU RETO:
 * Para resolver el ejercicio, debes crear una nueva entidad distinta
 * (por ejemplo: `products`, `tasks`, `books`, etc.). En tu nuevo controlador
 * (ej. `product.controller.js`), en vez de usar un arreglo en memoria,
 * utilizarás el cliente de Prisma:
 * 
 *   import { PrismaClient } from '@prisma/client';
 *   const prisma = new PrismaClient();
 *   ...
 *   const products = await prisma.product.findMany();
 * ==============================================================================
 */

// Datos de prueba en memoria para el ejemplo de referencia
let users = [

  { id: 1, name: 'Juan Pérez', email: 'juan@gmail.com' },

  { id: 2, name: 'María Gómez', email: 'maria@gmail.com' },
];

/**
 * 1. READ ALL - Obtener todos los usuarios
 * GET /api/users
 */
export const getAllUsers = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      total: users.length,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * 2. READ BY ID - Obtener un usuario por ID
 * GET /api/users/:id
 */
export const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * 3. CREATE - Crear un nuevo usuario
 * POST /api/users
 * Body: { "name": "...", "email": "..." }
 */
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Los campos "name" y "email" son obligatorios'
      });
    }

    const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser = { id: nextId, name, email };
    users.push(newUser);

    return res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: newUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * 4. UPDATE - Actualizar un usuario existente
 * PUT /api/users/:id
 * Body: { "name"?: "...", "email"?: "..." }
 */
export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email } = req.body;

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado para actualizar'
      });
    }

    users[index] = {
      ...users[index],
      ...(name && { name }),
      ...(email && { email })
    };

    return res.status(200).json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: users[index]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * 5. DELETE - Eliminar un usuario por ID
 * DELETE /api/users/:id
 */
export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado para eliminar'
      });
    }

    users.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: `Usuario con ID ${id} eliminado correctamente`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};