# 📁 Código Fuente (`src/`)

Estructura modular de la API en Express conectada con Prisma:

```text
Petición HTTP ➔ server.js ➔ app.js ➔ routes/ ➔ controllers/ ➔ Prisma (BD)
```

## 📂 Contenido

* **`controllers/`**: Recibe `req`/`res`, valida datos y ejecuta consultas con Prisma.
* **`routes/`**: Define los endpoints (`GET`, `POST`, `PUT`, `DELETE`) y los asocia a cada controlador.
* **`app.js`**: Configuración de Express y middlewares nativos (`express.json()`).
* **`server.js`**: Arranque del servidor HTTP en el puerto correspondiente.
