from flask import Flask, jsonify, request
import json

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
    app.run(debug = True)
