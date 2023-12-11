from flask import Flask, request
from flask_restx import Resource, Api
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
api = Api(app)

hw = api.namespace("hello-world", description="some hello world stuff")

@hw.route('/')
class HelloWorld(Resource):
	def get(self):
		return {'hello': 'world'}

mfd = api.namespace("MFD", description="methods to get and set the MFDs")

@mfd.route("/list")
class GetApplicationList(Resource):
	def get(self):
		return [{"id" : 1, "name" : "Star Citizen"}]

@mfd.route('/<int:app_id>')
class GetApplication(Resource):
	def get(self, app_id):
		f = open("server/applications/star-citizen.json")
		data = json.load(f)
		del data["commands"]
		return data

if __name__ == '__main__':
	app.run(debug=True)