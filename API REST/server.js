const express = require('express');
const userRoutes = require('./routes/users');
const houseRoutes = require('./routes/houses');
const { inicializarBaseDatos } = require('./db/database');
const app = express();
const PORT = process.env.PORT || 3000;

// Configura middleware para manejar solicitudes JSON
app.use(express.json());

inicializarBaseDatos();

// Montar las rutas de usuarios en la raíz de la aplicación
app.use('/users', userRoutes);

// Montar las rutas de casas en la raíz de la aplicación
app.use('/houses', houseRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto: ${PORT}`);
});
