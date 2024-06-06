// routes/houses.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

// Ruta para crear una nueva casa para un usuario específico
router.post('/:userId', (req, res) => {
    const { ciudad, calle, pais } = req.body;
    const usuarioId = req.params.userId;

    db.run("INSERT INTO casas (ciudad, calle, pais, usuario_id) VALUES (?, ?, ?, ?)", [ciudad, calle, pais, usuarioId], function(err) {
        if (err) {
            return res.status(500).json({ error: "Error al insertar casa en la base de datos" });
        }
        res.status(201).json({ mensaje: "Casa insertada correctamente", id: this.lastID });
    });
});

// Ruta para obtener todas las casas de un usuario con filtros opcionales de ciudad, calle y pais
router.get('/:userId', (req, res) => {
    const usuarioId = req.params.userId;
    const { ciudad, calle, pais } = req.query;

    let sql = "SELECT * FROM casas WHERE usuario_id = ?";
    let params = [usuarioId];

    if (ciudad) {
        sql += " AND ciudad LIKE ?";
        params.push(`%${ciudad}%`);
    }

    if (calle) {
        sql += " AND calle LIKE ?";
        params.push(`%${calle}%`);
    }

    if (pais) {
        sql += " AND pais LIKE ?";
        params.push(`%${pais}%`);
    }

    db.all(sql, params, (err, casas) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener casas de la base de datos" });
        }
        res.status(200).json(casas);
    });
});

// Ruta para actualizar una casa de un usuario
router.patch('/:userId/:houseId', (req, res) => {
    const houseId = req.params.houseId;
    const { ciudad, calle, pais } = req.body;

    // Construir la consulta SQL dinámicamente según los campos proporcionados
    let sql = "UPDATE casas SET";
    const params = [];

    if (ciudad !== undefined) {
        sql += " ciudad = ?,";
        params.push(ciudad);
    }

    if (calle !== undefined) {
        sql += " calle = ?,";
        params.push(calle);
    }

    if (pais !== undefined) {
        sql += " pais = ?,";
        params.push(pais);
    }

    // Eliminar la coma final de la cadena SQL
    sql = sql.slice(0, -1);

    sql += " WHERE id = ?";
    params.push(houseId);

    // Ejecutar la consulta SQL con los parámetros construidos
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar casa en la base de datos" });
        }
        res.status(200).json({ mensaje: "Casa actualizada correctamente" });
    });
});

// Ruta para eliminar una casa de un usuario
router.delete('/:userId/:houseId', (req, res) => {
    const houseId = req.params.houseId;

    db.run("DELETE FROM casas WHERE id = ?", [houseId], function(err) {
        if (err) {
            return res.status(500).json({ error: "Error al eliminar casa de la base de datos" });
        }
        res.status(200).json({ mensaje: "Casa eliminada correctamente" });
    });
});

module.exports = router;
