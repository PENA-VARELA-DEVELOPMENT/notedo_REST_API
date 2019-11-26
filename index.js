const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
const createError = require("http-errors");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

// importar variables globales
require("dotenv").config({ path: "variables.env"});

// crear el servidor de node
const app = express();

// configuración de la conexion de mongo y mongoose
const mongoUri = process.env.DATABASE;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
    console.log("conected to mongo cluster.");
});
mongoose.connection.on("error", err => {
    console.log("Error while connecting to mongo.", err);
});

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

//passport config
require("./config/passport")(passport)
// passport middleware
app.use(passport.initialize());
app.use(passport.session());



// llamada a las rutas
app.use("/", routes());

 // Administración de los errores
app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.locals.status = status;
    res.status(status).send(error.message);
  
 });

// Escuchar en el puerto 9888
app.listen(9888, () => {
    console.log("Listening on port 9888");
});