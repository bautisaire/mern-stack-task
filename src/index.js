const express = require("express");
const app = express();
const morgan = require("morgan"); // modulo que nos permite registrar las peticiones que nos estan llegando
const path = require("path");
const {mongoose} = require("./database");

//Settings
app.set("port", process.env.PORT || 3000)

//Middlewares (Funciones que se ejecutan antes de acceder a las rutas)
app.use(morgan("dev"));
app.use(express.json()); // cada vez que llega un dato a nuestro servidor va pasar por este middleware, y va 
// a comprobar si el dato es un json, si lo es, vamos a poder acceder a el en nuestro codigo de servidor y de
// la misma manera vamos a poder enviar datos en formato json

//Routes
app.use("/api/tasks", require("./routes/task.routes"));

//Static files
app.use(express.static(path.join(__dirname,"public"))); // path.join() detecta en que sistema operativo estamos e 
// ingresa a la ruta de la manera que requiere el sistema. Por ejemplo, linux es con / y windows es con \


// Starting the server

app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"));
});