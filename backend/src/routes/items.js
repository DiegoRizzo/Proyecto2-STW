import express from "express";
import { uid } from "uid";
import db from "../db/database.js";
const router = express.Router();

// GET /api/items
router.get("/", (req, res) => {
    const items = db.prepare("SELECT * FROM niveles WHERE activo = 1").all();
    res.json(items);
});

// GET /api/items/:id
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const item = db.prepare("SELECT * FROM niveles WHERE id = ? AND activo = 1").get(id);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
});

// POST /api/items
router.post("/", (req, res) => {
    const { nombre, categoriaId, estado, puntuacion, notas, atributos } = req.body;
    const id = uid(16);
    const fechaRegistro = new Date().toISOString();

    db.prepare(`
        INSERT INTO niveles (id, nombre, categoriaId, estado, puntuacion, fechaRegistro, notas, atributos)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        id, nombre, categoriaId, estado, puntuacion, fechaRegistro, notas || '', JSON.stringify(atributos || {})
    );

    res.status(201).json({ id });
});

// PUT /api/items/:id
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, categoriaId, estado, puntuacion, notas, atributos } = req.body;
    const fechaActividad = new Date().toISOString();

    db.prepare(`
        UPDATE niveles
        SET nombre = ?, categoriaId = ?, estado = ?, puntuacion = ?, fechaActividad = ?, notas = ?, atributos = ?
        WHERE id = ?
    `).run(
        nombre, categoriaId, estado, puntuacion, fechaActividad, notas || '', JSON.stringify(atributos || {}), id
    );

    res.json({ id });
});

// DELETE /api/items/:id
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("UPDATE niveles SET activo = 0 WHERE id = ?").run(id);
    res.json({ id });
});

// POST /api/items/:id/registro
router.post("/:id/registro", (req, res) => {
    const { id } = req.params;
    const { valor, notas } = req.body;
    const registroId = uid(16);
    const fecha = new Date().toISOString();

    db.prepare(`
        INSERT INTO registros (id, itemId, fecha, valor, notas)
        VALUES (?, ?, ?, ?, ?)
    `).run(registroId, id, fecha, valor, notas || '');

    res.status(201).json({ id: registroId });
});

export default router;