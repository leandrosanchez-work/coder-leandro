const fs = require("fs");

class Contenedor {
  constructor(path) {
    this.path = path;
  }

  save(objeto) {
    const contenido = fs.readFileSync('data/productos.json');
    const productos = JSON.parse(contenido);
    const id =
      productos.length > 0
        ? productos[productos.length - 1].id + 1
        : productos.length + 1;
    const producto = { id, ...objeto };
    productos.push(producto);
    fs.writeFileSync('data/productos.json', JSON.stringify(productos, null, 2));
    return id;
  }

  getById(id) {
    const data = fs.readFileSync('data/productos.json');
    const dataParseada = JSON.parse(data);
    const objeto = dataParseada.find((objeto) => objeto.id === id);
    return objeto;
  }

  getAll() {
    const data = fs.readFileSync('data/productos.json');
    const dataParseada = JSON.parse(data);
    return dataParseada;
  }

  deleteById(id) {
    const data = fs.readFileSync('data/productos.json');
    const dataParseada = JSON.parse(data);
    const dataFiltrada = dataParseada.filter((objeto) => objeto.id !== id);
    const dataString = JSON.stringify(dataFiltrada);
    fs.writeFileSync('data/productos.json', dataString);
    return dataFiltrada;
  }

  deleteAll() {
    fs.writeFileSync('data/productos.json', "[]");
    return "[]";
  }

  getRandom(){
    const productos = this.getAll();
    const randomNum = Math.floor(Math.random() * productos.length);
    
    return productos[randomNum]
  }
}

const contenedor = new Contenedor("productos.txt");

const producto1 = {
  title: "Regla",
  price: 123,
};

contenedor.save(producto1);
console.log(contenedor.getById(3));
console.log(contenedor.getAll());
contenedor.deleteById(5);
//contenedor.deleteAll();
contenedor.getAll();

module.exports = Contenedor;