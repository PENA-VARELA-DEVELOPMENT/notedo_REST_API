const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

// crear el servidor de node
const app = express();

// configuración de la conexion de mongo y mongoose
const mongoUri =
    "mongodb+srv://MDPC:3kGeEV9S2Z2snDV@cluster0-pkyho.mongodb.net/notedo?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
    console.log("coneected to mongo cluster.");
});
mongoose.connection.on("error", err => {
    console.log("Error while connecting to mongo.", err);
});

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// llamada a las rutas
app.use("/", routes());

// Escuchar en el puerto 9888
app.use(5000, () => {
    console.log("Listening on port 9888");
})