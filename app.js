const express = require('express')
const routes = require('./routes')
const app = express()
const PORT = 4000

app.use(routes)

routes.setup(app)

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});