from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS
from datetime import timedelta

app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'admin1',
    'database': 'Festival'
}

def get_db_connection():
    return pymysql.connect(
        host=db_config['host'],
        user=db_config['user'],
        password=db_config['password'],
        database=db_config['database'],
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/stiluri/<int:id>', methods=['GET'])
def get_stil(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM StiluriMuzicale WHERE idStil = %s", (id,))
    stil = cursor.fetchone()
    cursor.close()
    conn.close()
    if stil:
        return jsonify(stil)
    else:
        return jsonify({'error': 'Stilul nu a fost găsit'}), 404
@app.route('/stiluri/<int:id>', methods=['PUT'])
def update_stil(id):
    data = request.json  # Preluăm datele din corpul cererii
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "UPDATE StiluriMuzicale SET Nume = %s, Descriere = %s WHERE idStil = %s"
    cursor.execute(query, (data['Nume'], data['Descriere'], id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Stilul a fost actualizat cu succes!'}), 200

@app.route('/muzicieni/<int:id>', methods=['GET'])
def get_muzician(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Muzicieni WHERE idMuzician = %s", (id,))
    muzician = cursor.fetchone()
    cursor.close()
    conn.close()
    if muzician:
        return jsonify(muzician)
    else:
        return jsonify({'error': 'Muzicianul nu a fost găsit'}), 404
@app.route('/muzicieni/<int:id>', methods=['PUT'])
def update_muzician(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "UPDATE Muzicieni SET Nume = %s, Prenume = %s, NumeDeScena = %s WHERE idMuzician = %s"
    cursor.execute(query, (data['Nume'], data['Prenume'], data['NumeDeScena'], id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Muzicianul a fost actualizat cu succes!'}), 200

@app.route('/concerte/<int:id>', methods=['GET'])
def get_concert(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT 
            Festival.idConcert,
            Festival.DataCantarii,
            Festival.Scena,
            Festival.Ora,
            StiluriMuzicale.Nume AS GenMuzical,
            Muzicieni.NumeDeScena
        FROM Festival
        JOIN StiluriMuzicale ON Festival.idStil = StiluriMuzicale.idStil
        JOIN Muzicieni ON Festival.idMuzician = Muzicieni.idMuzician
        WHERE Festival.idConcert = %s
    """, (id,))
    concert = cursor.fetchone()

    # Conversie pentru câmpul Ora
    if concert and 'Ora' in concert and isinstance(concert['Ora'], timedelta):
        total_seconds = int(concert['Ora'].total_seconds())
        hours, remainder = divmod(total_seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        concert['Ora'] = f"{hours:02}:{minutes:02}:{seconds:02}"

    cursor.close()
    conn.close()

    if concert:
        return jsonify(concert)
    else:
        return jsonify({'error': 'Concertul nu a fost găsit'}), 404

@app.route('/concerte/<int:id>', methods=['PUT'])
def update_concert(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    # Actualizare concert în baza de date
    try:
        query = """
            UPDATE Festival 
            SET DataCantarii = %s, Scena = %s, Ora = %s 
            WHERE idConcert = %s
        """
        cursor.execute(query, (data['DataCantarii'], data['Scena'], data['Ora'], id))
        conn.commit()

        # Returnare răspuns actualizat
        cursor.execute("SELECT * FROM Festival WHERE idConcert = %s", (id,))
        concert = cursor.fetchone()

        # Conversie timedelta pentru câmpul 'Ora'
        if concert and 'Ora' in concert and isinstance(concert['Ora'], timedelta):
            total_seconds = int(concert['Ora'].total_seconds())
            hours, remainder = divmod(total_seconds, 3600)
            minutes, seconds = divmod(remainder, 60)
            concert['Ora'] = f"{hours:02}:{minutes:02}:{seconds:02}"

        return jsonify({'message': 'Concertul a fost actualizat cu succes!', 'concert': concert}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/stiluri', methods=['GET'])
def get_stiluri():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM StiluriMuzicale")
    stiluri = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(stiluri)

@app.route('/muzicieni', methods=['GET'])
def get_muzicieni():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Muzicieni")
    muzicieni = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(muzicieni)

@app.route('/concerte', methods=['GET'])
def get_concerte():
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
        SELECT 
            Festival.idConcert,
            StiluriMuzicale.Nume AS GenMuzical,
            Muzicieni.NumeDeScena,
            Festival.DataCantarii,
            Festival.Scena,
            Festival.Ora
        FROM Festival
        JOIN StiluriMuzicale ON Festival.idStil = StiluriMuzicale.idStil
        JOIN Muzicieni ON Festival.idMuzician = Muzicieni.idMuzician
    """
    cursor.execute(query)
    rows = cursor.fetchall()
    
    # Convertim rezultatele pentru a face 'timedelta' serializabil
    for row in rows:
        if 'Ora' in row and isinstance(row['Ora'], timedelta):
            total_seconds = int(row['Ora'].total_seconds())
            hours, remainder = divmod(total_seconds, 3600)
            minutes, seconds = divmod(remainder, 60)
            row['Ora'] = f"{hours:02}:{minutes:02}:{seconds:02}"
    
    cursor.close()
    conn.close()
    return jsonify(rows)


@app.route('/stiluri/<int:id>', methods=['DELETE'])
def delete_stil(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM StiluriMuzicale WHERE idStil = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Stil șters cu succes!'}), 200

@app.route('/muzicieni/<int:id>', methods=['DELETE'])
def delete_muzician(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Muzicieni WHERE idMuzician = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Muzician șters cu succes!'}), 200

@app.route('/concerte/<int:id>', methods=['DELETE'])
def delete_concert(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Festival WHERE idConcert = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Concert șters cu succes!'}), 200

@app.route('/adaugare/<endpoint>', methods=['POST'])
def add_item(endpoint):

    # Logica pentru cererea POST
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        if endpoint == 'stiluri':
            query = "INSERT INTO StiluriMuzicale (Nume, Descriere) VALUES (%s, %s)"
            cursor.execute(query, (data['Nume'], data['Descriere']))
        elif endpoint == 'muzicieni':
            query = "INSERT INTO Muzicieni (Nume, Prenume, NumeDeScena) VALUES (%s, %s, %s)"
            cursor.execute(query, (data['Nume'], data['Prenume'], data['NumeDeScena']))
        elif endpoint == 'concerte':
            query = "INSERT INTO Festival (idStil, idMuzician, DataCantarii, Scena, Ora) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(query, (data['idStil'], data['idMuzician'], data['DataCantarii'], data['Scena'], data['Ora']))
        else:
            return jsonify({'error': 'Endpoint invalid'}), 400

        conn.commit()
        return jsonify({'message': f'Element adăugat cu succes în {endpoint}!'}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    app.run(debug=True)