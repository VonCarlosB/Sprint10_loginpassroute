const express = require('express')
const routes = require('./routes')
const middlewares = require('./middlewares')
const app = express()
const PORT = 4000
const dotenv = require('dotenv')
dotenv.config()

middlewares.setupAPP(app)

routes.setup(app)

app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
    res.send(`
        <h1>Ruta del Perfil</h1>
        <form method="post" action="/logout">
            <button type="submit">Log Out</button>
        </form>
    `);
});

app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
    res.send(`
        <h1>Ruta del Perfil (Sesión activa)</h1>
        <form method="post" action="/logout">
            <button type="submit">Log Out</button>
        </form>
    `);
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/');
    });
});

app.use((req, res) => {
    res.status(404).send(`
        <h1>Page not found</h1>
        <a href="/">Home</a>
    `)
})

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});