from flask import Flask, jsonify, abort, make_response, request, url_for, g
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

	errorString = 'Geen errors gekregen, tijd voor bier!!'

	conn = connect_db()

	waardes = conn.execute("SELECT n, somX, somY, somX2, somY2, somXY FROM sensorWaardes")
	statistics = waardes.fetchone() # Dit kan, omdat alles in 1 regel gedaan wordt in de DB.

	if not statistics or statistics['n'] == 0: # Als het toch niet goed is gegaan, geef een error terug.
		conn.close()
		return jsonify({'error': 'No statistics found'})
	
	n = statistics['n']
	somX = statistics['somX']
	somY = statistics['somY']
	somX2 = statistics['somX2']
	somY2 = statistics['somY2']
	somXY = statistics['somXY']
	
	b1_1 = (somXY - ((somX * somY)/n))
	b1_2 =  (somX2 - ((somX ** 2)/n))
	if b1_1 == 0 or b1_2 == 0:
		b1 = 0
		errorString = 'Er is een deling door nul ontweken, deze resultaten zijn niet betrouwbaar!'
	else:
		b1 = b1_1/b1_2

	b0 = (somY - b1 * somX) / n

	R2_1 = ((n * somXY - somX * somY) ** 2)
	R2_2 = ((n * somX2 - somX ** 2) * (n * somY2 - somY ** 2))

	if R2_1 == 0 or R2_2 == 0:
		R2 = 0
		errorString = 'Er is een deling door nul ontweken, deze resultaten zijn niet betrouwbaar!'
	else:
		R2 = R2_1/R2_2

	conn.close()


	# If any of these values have returned infinite, its because 
	return jsonify({
		'error' : errorString,
        'b0': b0,
        'b1': b1,
        'R2': R2
    })


@app.route('/data', methods=['POST'])
def addData():
	data = request.json
	sensor1_waarde = data.get('sensor1_waarde') # X
	sensor2_waarde = data.get('sensor2_waarde')	# Y

	conn = connect_db()    
	conn.execute("UPDATE sensorWaardes SET n = n + 1, somX = somX + ?, somY = somY + ?, somX2 = somX2 + ?, somY2 = somY2 + ?, somXY = somXY + ?",
	(sensor1_waarde, sensor2_waarde, sensor1_waarde ** 2, sensor2_waarde ** 2, sensor1_waarde * sensor2_waarde))
	conn.commit()
	conn.close()

	return 201


@app.route('/statistics', methods=['DELETE'])
def deleteStatistics(): 
	conn = connect_db()    
	conn.execute("UPDATE sensorWaardes SET n = 0, somX = 0, somY = 0, somX2 = 0, somY2 = 0, somXY = 0")
	conn.commit()
	conn.close()
	return jsonify({'message': 'Database information reset to 0'})


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