const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const productRoutes = require('./src/routes/productRoutes');

//habilitar cors
app.use(cors())

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB local
mongoose.connect('mongodb://localhost:27017/mi-base-de-datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB local'))
.catch(err => console.error('Error conectando a MongoDB:', err));

// Prefijo para las rutas
app.use('/api/products', productRoutes); 

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});