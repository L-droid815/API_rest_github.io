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

  { id: 1, producto: 'Computadora Acer', precio: "1500$", unidades: 2 },

  { id: 2, producto: 'Computadora Asus', precio: "1200$", unidades: 10 },
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
 * 3. CREATE - Crear un nuevo usuario / producto
 * POST /api/users
 */
export const createUser = async (req, res) => {
    try {
        const { producto, precio, unidades } = req.body;

        // Validamos que los campos obligatorios estén presentes
        if (!producto || !precio || unidades === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Los campos "producto", "precio" y "unidades" son obligatorios'
            });
        }

        const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
        const newUser = { id: nextId, producto, precio, unidades };
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
 * 4. UPDATE - Actualizar un usuario / producto existente
 * PUT /api/users/:id
 */
export const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { producto, precio, unidades } = req.body;

        const index = users.findIndex((u) => u.id === id);
        
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado para actualizar'
            });
        }

        // Actualizamos los campos que vengan en la petición
        users[index] = {
            ...users[index],
            ...(producto && { producto }),
            ...(precio && { precio }),
            ...(unidades !== undefined && { unidades })
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