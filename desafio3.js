const express = require("express");
const app = express();
const Contenedor= require("./Contenedor");
const contenedor = new Contenedor("./productos.json");

//? Settings

app.set("port", 8080); //*Configuración puerto

//rutas

app.get("/", (req, res) => {
  res.send("<h1 style='color:blue'>SERVIDOR ESCUCHANDO</h1>");
});

app.get("/productos", async (req, res) => {
  let data = await contenedor.getAll();
  res.send(data);
});

app.get("/productosRandom", async (req, res) => {
    //! Números aleatorios del 1 al 10
  const producto = await contenedor.getRandom();
  //! Si el id generado no coincide con ningún producto, devuelve null; de lo contrario, envía la información solicitada
  res.json(producto);
});


//? Servidor iniciado

const server = app.listen(app.get("port"), () => {
  console.log(`Servidor express iniciado en puerto ${app.get("port")}`);
});

//? Manejo de errores

server.on("error", (error) => {
  console.log(`Error !!!: ${error}`);
});