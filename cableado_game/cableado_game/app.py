from flask import Flask, render_template, request, jsonify, session
import sqlite3
import os

app = Flask(__name__)
app.secret_key = 'cableado_estructurado_2024'
DB_PATH = os.path.join(os.path.dirname(__file__), 'database', 'game.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = get_db()
    conn.executescript('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL UNIQUE,
            nivel_desbloqueado INTEGER DEFAULT 1,
            puntaje INTEGER DEFAULT 0,
            creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS progreso (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER NOT NULL,
            nivel INTEGER NOT NULL,
            juego INTEGER NOT NULL,
            completado INTEGER DEFAULT 0,
            puntaje_juego INTEGER DEFAULT 0,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
            UNIQUE(usuario_id, nivel, juego)
        );
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/intro')
def intro():
    return render_template('intro.html')

@app.route('/nivel/<int:num>')
def nivel(num):
    if 'usuario_id' not in session:
        return render_template('index.html', error="Debes iniciar sesión primero")
    usuario_id = session['usuario_id']
    conn = get_db()
    usuario = conn.execute('SELECT * FROM usuarios WHERE id = ?', (usuario_id,)).fetchone()
    conn.close()
    if not usuario or num > usuario['nivel_desbloqueado']:
        return render_template('index.html', error="Nivel bloqueado")
    return render_template('nivel.html', nivel=num, nombre=usuario['nombre'])

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    nombre = data.get('nombre', '').strip()
    if not nombre:
        return jsonify({'error': 'Nombre requerido'}), 400
    conn = get_db()
    usuario = conn.execute('SELECT * FROM usuarios WHERE nombre = ?', (nombre,)).fetchone()
    if not usuario:
        conn.execute('INSERT INTO usuarios (nombre) VALUES (?)', (nombre,))
        conn.commit()
        usuario = conn.execute('SELECT * FROM usuarios WHERE nombre = ?', (nombre,)).fetchone()
    session['usuario_id'] = usuario['id']
    session['nombre'] = usuario['nombre']
    conn.close()
    return jsonify({
        'id': usuario['id'],
        'nombre': usuario['nombre'],
        'nivel_desbloqueado': usuario['nivel_desbloqueado'],
        'puntaje': usuario['puntaje']
    })

@app.route('/guardar_progreso', methods=['POST'])
def guardar_progreso():
    if 'usuario_id' not in session:
        return jsonify({'error': 'No autenticado'}), 401
    data = request.get_json()
    nivel = data.get('nivel')
    juego = data.get('juego')
    puntaje_juego = data.get('puntaje', 0)
    usuario_id = session['usuario_id']
    conn = get_db()
    conn.execute('''
        INSERT INTO progreso (usuario_id, nivel, juego, completado, puntaje_juego)
        VALUES (?, ?, ?, 1, ?)
        ON CONFLICT(usuario_id, nivel, juego) DO UPDATE SET completado=1, puntaje_juego=MAX(puntaje_juego, ?)
    ''', (usuario_id, nivel, juego, puntaje_juego, puntaje_juego))
    completados = conn.execute('''
        SELECT COUNT(*) as c FROM progreso
        WHERE usuario_id=? AND nivel=? AND completado=1
    ''', (usuario_id, nivel)).fetchone()['c']
    nuevo_nivel = None
    if completados >= 5:
        usuario = conn.execute('SELECT nivel_desbloqueado FROM usuarios WHERE id=?', (usuario_id,)).fetchone()
        if usuario['nivel_desbloqueado'] <= nivel:
            nuevo_nivel = nivel + 1
            conn.execute('UPDATE usuarios SET nivel_desbloqueado=? WHERE id=?', (nuevo_nivel, usuario_id))
    puntaje_total_row = conn.execute('SELECT SUM(puntaje_juego) as total FROM progreso WHERE usuario_id=?', (usuario_id,)).fetchone()
    puntaje_total = puntaje_total_row['total'] or 0
    conn.execute('UPDATE usuarios SET puntaje=? WHERE id=?', (puntaje_total, usuario_id))
    conn.commit()
    conn.close()
    return jsonify({
        'ok': True,
        'juegos_completados': completados,
        'nivel_desbloqueado': nuevo_nivel,
        'puntaje_total': puntaje_total
    })

@app.route('/estado')
def estado():
    if 'usuario_id' not in session:
        return jsonify({'error': 'No autenticado'}), 401
    usuario_id = session['usuario_id']
    conn = get_db()
    usuario = conn.execute('SELECT * FROM usuarios WHERE id=?', (usuario_id,)).fetchone()
    progreso = conn.execute('SELECT nivel, juego FROM progreso WHERE usuario_id=? AND completado=1', (usuario_id,)).fetchall()
    conn.close()
    completados = [{'nivel': p['nivel'], 'juego': p['juego']} for p in progreso]
    return jsonify({
        'nombre': usuario['nombre'],
        'nivel_desbloqueado': usuario['nivel_desbloqueado'],
        'puntaje': usuario['puntaje'],
        'completados': completados
    })

@app.route('/ranking')
def ranking():
    conn = get_db()
    top = conn.execute('SELECT nombre, puntaje, nivel_desbloqueado FROM usuarios ORDER BY puntaje DESC LIMIT 10').fetchall()
    conn.close()
    return jsonify([dict(r) for r in top])

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=2000)
