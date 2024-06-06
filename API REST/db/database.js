// database.js
const sqlite3 = require('sqlite3').verbose();

function inicializarBaseDatos() {
    const db = new sqlite3.Database('./database.sqlite');

    // Crear la tabla de usuarios si no existe
    db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nombre TEXT, correo TEXT)");

    // Crear la tabla de casas si no existe
    db.run(`CREATE TABLE IF NOT EXISTS casas (
        id INTEGER PRIMARY KEY,
        ciudad TEXT,
        calle TEXT,
        pais TEXT,
        usuario_id INTEGER,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )`);

    db.close();
}

module.exports = { inicializarBaseDatos };
