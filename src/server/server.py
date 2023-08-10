import json

from flask import Flask, jsonify, request
from util.server_setup import setup_server

app = Flask(__name__)

# Test routes
@app.route('/test', methods = ['GET', 'POST'])
def test():
	match request.method:
		case 'GET':
			return ['One', 'Two', 'Three']
		case 'POST':
			data = json.loads(request.data)
			print(data['data'])
			return jsonify(success=True)
		case _:
			raise Exception('Unsupported Http verb')


if __name__ == '__main__':
	setup_server()
	app.run(debug = True)
