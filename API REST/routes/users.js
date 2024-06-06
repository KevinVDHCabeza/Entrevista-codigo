// routes/users.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
    const { nombre, correo } = req.body;

    db.run("INSERT INTO usuarios (nombre, correo) VALUES (?, ?)", [nombre, correo], function(err) {
        if (err) {
            return res.status(500).json({ error: "Error al insertar usuario en la base de datos" });
        }
        res.status(201).json({ mensaje: "Usuario insertado correctamente", id: this.lastID });
    });
});

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
    db.all("SELECT * FROM usuarios", (err, usuarios) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener usuarios de la base de datos" });
        }
        res.status(200).json(usuarios);
    });
});

// Ruta para obtener un solo usuario por su ID
router.get('/:id', (req, res) => {
    const idUsuario = req.params.id;

    db.get("SELECT * FROM usuarios WHERE id = ?", [idUsuario], (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener usuario de la base de datos" });
        }
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    });
});

// Ruta para actualizar completamente un usuario por su ID
router.put('/:id', (req, res) => {
    const idUsuario = req.params.id;
    const { nombre, correo } = req.body;

    db.run("UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?", [nombre, correo, idUsuario], function(err) {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar usuario en la base de datos" });
        }
        res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
    });
});

// Ruta para actualizar parcialmente un usuario por su ID
router.patch('/:id', (req, res) => {
    const idUsuario = req.params.id;
    const { nombre, correo } = req.body;

    if (!nombre && !correo) {
        return res.status(400).json({ error: "Se requiere al menos un campo para actualizar" });
    }

    let sql = "UPDATE usuarios SET";
    const params = [];

    if (nombre) {
        sql += " nombre = ?,";
        params.push(nombre);
    }

    if (correo) {
        sql += " correo = ?,";
        params.push(correo);
    }

    // Eliminar la coma final de la cadena SQL
    sql = sql.slice(0, -1);

    sql += " WHERE id = ?";
    params.push(idUsuario);

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar usuario en la base de datos" });
        }
        res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
    });
});

router.delete('/:id', (req, res) => {
    const idUsuario = req.params.id;

    // Comprobar si el usuario tiene casas asignadas
    db.get("SELECT COUNT(*) AS count FROM casas WHERE usuario_id = ?", [idUsuario], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al buscar casas asignadas al usuario en la base de datos" });
        }

        const count = result.count;

        if (count > 0) {
            // Si el usuario tiene casas asignadas, devolver un mensaje indicando la cantidad y las IDs de las casas
            db.all("SELECT id FROM casas WHERE usuario_id = ?", [idUsuario], (err, casas) => {
                if (err) {
                    return res.status(500).json({ error: "Error al obtener IDs de las casas asignadas al usuario" });
                }

                const casaIds = casas.map(casa => casa.id);
                return res.status(400).json({ error: `El usuario tiene ${count} casa(s) asignada(s) a él`, casas: casaIds });
            });
        } else {
            // Si el usuario no tiene casas asignadas, proceder a eliminarlo
            db.run("DELETE FROM usuarios WHERE id = ?", [idUsuario], function(err) {
                if (err) {
                    return res.status(500).json({ error: "Error al eliminar usuario de la base de datos" });
                }
                res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
            });
        }
    });
});

module.exports = router;
