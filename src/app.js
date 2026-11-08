/**
 * ==============================================================================
 * CONFIGURACIÓN DE LA APLICACIÓN EXPRESS (App)
 * ==============================================================================
 * ¿Qué va en este archivo?
 * - Se instancia la aplicación de Express.
 * - Se configuran los middlewares globales esenciales (parseo de JSON, formularios).
 * - Se registran las rutas principales.
 * - Se maneja el middleware de error para rutas no encontradas (404).
 * ==============================================================================
 */

import express from 'express';
import routes from './routes/index.routes.js';

const app = express();

// Middlewares nativos de Express para parsear el cuerpo de las peticiones (sin librerías extras)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montar el enrutador principal
app.use(routes);

// Middleware 404: Captura cualquier ruta no definida
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      status: 404,
      message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    }
  });
});

export default app;
