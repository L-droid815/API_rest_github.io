import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. READ ALL - Obtener todos los usuarios de la BD
export const getAllUsersPrisma = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
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

// 2. READ BY ID - Obtener un usuario por ID desde la BD
export const getUserByIdPrisma = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await prisma.user.findUnique({
            where: { id }
        });

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

// 3. CREATE - Crear un nuevo usuario en la BD
export const createUserPrisma = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'El campo "email" es obligatorio'
            });
        }

        const newUser = await prisma.user.create({
            data: { name, email }
        });

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

// 4. UPDATE - Actualizar un usuario existente en la BD
export const updateUserPrisma = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, email } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email }
        });

        return res.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            data: updatedUser
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado para actualizar',
            error: error.message
        });
    }
};

// 5. DELETE - Eliminar un usuario de la BD
export const deleteUserPrisma = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        await prisma.user.delete({
            where: { id }
        });

        return res.status(200).json({
            success: true,
            message: `Usuario con ID ${id} eliminado correctamente`
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado para eliminar',
            error: error.message
        });
    }
};