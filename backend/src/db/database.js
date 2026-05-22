const Database = require('better-sqlite3')

const db = new Database('niveles.sqlite')

db.exec(`
    CREATE TABLE IF NOT EXISTS niveles (
        id TEXT PRIMARY KEY,
        nombre TEXT NOT NULL,
        categoriaId TEXT NOT NULL,
        estado TEXT NOT NULL,
        puntuacion REAL,
        fechaRegistro TEXT NOT NULL,
        fechaActividad TEXT,
        notas TEXT DEFAULT '',
        atributos TEXT DEFAULT '{}',
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