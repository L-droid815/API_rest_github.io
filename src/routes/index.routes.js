import { Router } from 'express';
import userRoutes from './user.routes.js';

const router = Router();

// Rutas del recurso Users
router.use('/api/users', userRoutes);

// TODO: Importa y monta aquí las rutas de tu nuevo recurso:
// import productRoutes from './product.routes.js';
// router.use('/api/products', productRoutes);

export default router;