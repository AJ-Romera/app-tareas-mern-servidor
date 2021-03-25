const express = require('express');
const conectarDB = require('./config/db');

// Crear el servidor
const app = express();

// Conectar a la DB
conectarDB();

// Puerto de la app
const PORT = process.env.PORT || 4000;

/* // Definir la página principal
app.get('/', (req, res) => {
    res.send('Hola Mundo');
}); */

// Arrancar la app/servidor
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
