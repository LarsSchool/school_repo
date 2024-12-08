from flask import Flask, jsonify, make_response, request, g
from sqlite3 import dbapi2 as sqlite3
import numpy as np

app = Flask(__name__)

#---ERRORS---
@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify({'error': '404 - Not found'}), 404)

@app.errorhandler(400)
def bad_request(error):
	return make_response(jsonify({'error': 'Bad request'}),400)

#---METHODS/ ROUTES---
@app.route('/statistics', methods=['GET'])
def getStatistics():

	conn = connect_db()

	waardes = conn.execute("SELECT * FROM sensorWaardes")
	statistics = waardes.fetchall()

	if len(statistics) < 3:
		return make_response('', 200)

	X_waardes = np.transpose(np.array([[waarde['sensor1'] for waarde in statistics]]))
	Y_waardes = np.transpose(np.array([[waarde['sensor2'] for waarde in statistics]]))

	X = np.concatenate((np.power(X_waardes, 0), np.power(X_waardes, 1), np.power(X_waardes, 2)), axis=1)
	B = np.linalg.inv((np.transpose(X) @ X)) @ np.transpose(X) @ Y_waardes

	b0 = B[0][0]
	b1 = B[1][0]
	b2 = B[2][0]
	
	voorspelling_Y = X @ B 
	gemiddelde_Y = np.average(Y_waardes)

	R2 = 1.0 - (np.sum((Y_waardes-voorspelling_Y)**2)/ np.sum((Y_waardes-gemiddelde_Y)**2)) # Hier moeten numpy sums worden gebruikt EN NIET DE NORMALE. Anders kom je wel op het juiste antwoord, maar krijgt je het als een array. Vraag niet hoe ik het weet...
	conn.close()

	return make_response(f"{b0} {b1} {b2} {R2}", 200)


@app.route('/data', methods=['POST'])
def addData():
	data = request.data.decode('ascii') # Vertaal het request naar bruikbare data
	sensor_values = data.split() # Split de verkregen waardes op whitespace, dit gebeurd als je geen waardes meegeeft aan de split().

	if len(sensor_values) != 2:
		return 'Te veel of te weinig informatie, het mogen maar 2 waardes zijn.', 400
	
	conn = get_db()
	conn.execute("INSERT INTO sensorWaardes (sensor1, sensor2) VALUES (?, ?)",
                   (sensor_values[0], sensor_values[1]))
	conn.commit()
	conn.close()

	return '', 201


@app.route('/statistics', methods=['DELETE'])
def deleteStatistics(): 
	conn = connect_db()    
	conn.execute("DELETE from sensorWaardes")
	conn.commit()
	conn.close()
	return '', 201


#---FUNCTIONS---
def get_db():
	"""
	Opens a new database connection if there is none yet
	for the current application context.
	"""
	if not hasattr(g, 'sqlite_db'):
		g.sqlite_db = connect_db()
	return g.sqlite_db

def connect_db():
	"""Connects to the specific database."""
	rv = sqlite3.connect('eindopdracht.db')
	rv.row_factory = sqlite3.Row
	return rv

if __name__ == '__main__':
	app.run(debug=True)