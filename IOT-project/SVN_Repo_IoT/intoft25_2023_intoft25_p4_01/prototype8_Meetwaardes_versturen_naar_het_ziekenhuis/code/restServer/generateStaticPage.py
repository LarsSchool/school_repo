from flask import Flask, abort, make_response, \
request, url_for, g
from sqlite3 import dbapi2 as sqlite3
app = Flask(__name__)

def get_db():
	"""for the current application context."""
	if not hasattr(g, 'sqlite_db'):
		g.sqlite_db = connect_db()
	return g.sqlite_db

def connect_db():
	"""Connects to the specific database."""
	rv = sqlite3.connect('../database/mmu.db')
	rv.row_factory = sqlite3.Row
	return rv

@app.teardown_appcontext
def close_db(error):
	"""Closes the database again at the end of the request."""
	if hasattr(g, 'sqlite_db'):
		g.sqlite_db.close()

def last_id():
	db = get_db()
	cur = db.execute('select last_insert_rowid() from patient')
	rows = cur.fetchall()
	return rows[0][0]


def createPatient(idNewPatient):
	db = get_db()
	db.execute("instert into patient (id) values(?)",
				  (idNewPatient)) 
	db.commit

def deletePatient(patientId):
	db = get_db()
	db.execute("delete from patient where id = ?",
			(patientId))
	db.commit

def countPatient():
	db = get_db()
	cur = db.execute("SELECT COUNT(*) as count from patient")
	db.commit
	rows = cur.fetchall() 
	count = []
	for row in rows:
		count.append({'count': row[0]})
	return count[0]

# return list of patient (i.e. in this case, one patient)
def retrieve_patient(patientId):
	db = get_db()
	# patientId is forced into a tuple:
	cur = db.execute("select * from patient where id = ?",
	(patientId))
	rows = cur.fetchall() # list of Row objects, can't jsonify
	patienten = []
	for row in rows:
		patienten.append({'id': row[0], 'ECG': row[1],
		'Hemaglobine': row[2], 'Bovendruk': row[3], 'Onderdruk': row[4], 'Cholesterol': row[5], 'Zuurstofgehalte': row[6], 'Hartslag':row[7	] == 1})
	return patienten

def getAllPatient():
	db = get_db()
	cur = db.execute("SELECT * FROM patient")
	db.commit
	rows = cur.fetchall()
	patients = []
	for row in rows:
		patients.append({'id': row[0], 'ECG': row[1],
		'Hemaglobine': row[2], 'Bovendruk': row[3], 'Onderdruk': row[4], 'Cholesterol': row[5], 'Zuurstofgehalte': row[6], 'Hartslag':row[7] == 1})
	return patients

@app.route('/')
def index():
	return getAllPatient()
if __name__ == '__main__':
	app.run(debug=True)

			
@app.route('/', methods=['GET'])
def updateMeetwaarde(patientId, meetWaarde):
	if not request.json:
		abort(400)
	db = get_db()
	cur = db.execute("update patient" + "set ? = ? where id = ?",
				  meetWaarde,
				  request.json[meetWaarde],
				  patientId
				  )
	db.commit

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad request'}),
400)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}),
404)

if __name__ == '__main__':
    app.run(debug=True)