const express = require('express');
const userRoutes = require('./routes/users');
const houseRoutes = require('./routes/houses');
const { inicializarBaseDatos } = require('./db/database');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const PORT = process.env.PORT || 3000;

const app = express();


app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use(express.json());

inicializarBaseDatos();

app.use('/users', userRoutes);

app.use('/houses', houseRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto: ${PORT}`);
});
