const Database = require('better-sqlite3')

const db = new Database('niveles.sqlite')

db.exec(`
    CREATE TABLE IF NOT EXISTS niveles (
        id TEXT PRIMARY KEY,
        nombre TEXT NOT NULL,
        categoriaId TEXT,
        estado TEXT,
        puntuacion REAL,
        fechaRegistro TEXT,
        fechaActividad TEXT,
        notas TEXT,
        atributos TEXT,
        activo INTEGER DEFAULT 1
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS registros (
        id TEXT PRIMARY KEY,
        itemId TEXT NOT NULL,
        fecha TEXT NOT NULL,
        valor REAL NOT NULL,
        notas TEXT DEFAULT ''
    )
`)

module.exports = db