// Snippets de código para poder componer el programa

//Usado?: X
  const middlewares = require('./middlewares');
//--- Explicación: 
// Importa los middlewares del archivo middlewares.js
// -------------------------------------------------------------------------------------

//Usado?: X
const bodyParser = require('body-parser');
//--- Explicación:
// Crea la variable bodyParser que requiere el módulo 'body-parser'
// -------------------------------------------------------------------------------------

//Usado?: X
const session = require('express-session');
//--- Explicación:
// Crea la variable session que requiere el módulo 'express-session'
// -------------------------------------------------------------------------------------

//Usado?: X
const express = require('express');
//--- Explicación:
// Crea la variable express que requiere el módulo 'express'
// -------------------------------------------------------------------------------------

//Usado?: X
const bodyParser = require('body-parser');
//--- Explicación:
// Crea la variable bodyParser que requiere le módulo 'body-parser'
// -------------------------------------------------------------------------------------

//Usado?: X
const session = require('express-session');
//--- Explicación:
// Crea la variable session que requiere el módulo 'express-session'
// -------------------------------------------------------------------------------------

//Usado?: X
const dotenv = require('dotenv');
//--- Explicación:
// Crea la variable dotenv que requiere el módulo 'dotenv'
// -------------------------------------------------------------------------------------

//Usado?: X
const middlewares = require('./middlewares');
//--- Explicación:
// Crea la variable middlewares que requiere el módulo 'middlewares.js'
// -------------------------------------------------------------------------------------

//Usado?: X
const routes = require('./routes');
//--- Explicación:
// Crea la variable routes que requiere el módulo 'routes.js'
// -------------------------------------------------------------------------------------

//Usado?: X
dotenv.config();
//--- Explicación:
// Llama a la función config() de la variable dotenv
// -------------------------------------------------------------------------------------

//Usado?: X
const app = express();
//--- Explicación:
// Crea el servidor app utilizando la variable express
// -------------------------------------------------------------------------------------

//Usado?: X
const PORT = 4000;
//--- Explicación:
// Crea una variable PORT que almacena el número del puerto en el que escucha el servidor, en este caso el 4000
// -------------------------------------------------------------------------------------

//Usado?: X
const dotenv = require('dotenv');
//--- Explicación:
// Crea la variable dotenv que requiere el módulo 'dotenv'
// -------------------------------------------------------------------------------------

//Usado?: X
dotenv.config();
//--- Explicación:
// Ejecuta la función config() de la variable dotenv
// -------------------------------------------------------------------------------------

//Usado?: X
middlewares.setupApp(app);
//--- Explicación: 
// Llama a la función setupApp con el parámetro app
// -------------------------------------------------------------------------------------

//Usado?: X
routes.setup(app);
//--- Explicación: 
//Inicialización de app en app.js a través de routes.js
// -------------------------------------------------------------------------------------

//Usado?: X
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: 
//Middleware que verifica si la palabra introducida en el formulario es la correcta. Si es correcta se asigna a la variable req.session.palabraSecreta y si no es correcta redirige al inicio con un error.
// -------------------------------------------------------------------------------------


//Usado?: X
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: 
/* Variable setup que utiliza el parámetro app y comprueba si hay un mensaje de error para poner un mensaje u otro. También, si la palabra secreta es correcta redirije a /profile */

// -------------------------------------------------------------------------------------


//Usado?: X
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: 
/*Se envía un body html con el formulario de la página de inicio*/

// -------------------------------------------------------------------------------------

//Usado?: X
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: 
// Constante/función setupAPP que utiliza el parámetro app para cambiar algunas de sus configuraciones, establecer un bodyParser y una session
// -------------------------------------------------------------------------------------

//Usado?: X
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 
// Ruta /profile que primero debe pasar por el middleware validarPalabraMiddleware para luego enviar el body para cerrar la sesión.
// -------------------------------------------------------------------------------------

//Usado?: X
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 
// Permite codificar la url
// -------------------------------------------------------------------------------------

//Usado?:
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: X
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: 
//Pone a escuchar al servidor en el puerto PORT
// -------------------------------------------------------------------------------------

//Usado?: X
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: 
//Middleware que redirije con error si la palabra secreta no es correcta
// -------------------------------------------------------------------------------------


//Usado?: X
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 
//Ruta /profile que utiliza el middleware verificarSesionMiddleware y, si pasa, envía un body HTML
// -------------------------------------------------------------------------------------


//Usado?: X
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: 
//Ruta /logout que elimina la sesión en uso
// -------------------------------------------------------------------------------------

//Usado?: X
module.exports = {
  setup,
};
//--- Explicación:
// Exportación de la constante/función setup
// -------------------------------------------------------------------------------------

//Usado?: X
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación:
// Exportación de los middleware como un objeto
// -------------------------------------------------------------------------------------

