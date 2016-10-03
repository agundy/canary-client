from flask import jsonify, request

from . import api
from .. import db
from ..models.user import User
from ..schemas.user import user_schema, users_schema


@api.route('/users', methods=['GET'])
def get_users():
    pass


@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    pass


@api.route('/users', methods=['POST'])
def create_user():
	username = request.json.get('username')
	password = request.json.get('password')
	if username is None or password is None:
		abort(400) # missing arguments
	if User.query.filter_by(username = username).first() is not None:
		abort(400) # existing user
	user = User(username = username)
	user.hash_password(password)
	db.session.add(user)
	db.session.commit()
	return jsonify({ 'username': user.username }), 201, {'Location': url_for('get_user', id = user.id, _external = True)}


@api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    pass
