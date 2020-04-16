import pm4py
from pm4pytool import objects, mapping, execute
from pm4pytool.mapping import Mapping
from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import json

app = Flask(__name__, static_url_path='', static_folder="../html")
app.add_url_rule(app.static_url_path + '/<path:filename>', endpoint='static',
                 view_func=app.send_static_file)
CORS(app)


def include_key(res, key):
    obj = Mapping.obj_dict[key]
    if obj[1]["inttype"] == "algo":
        res["algoMapping"][obj[0]] = obj
    else:
        res["objMapping"][obj[0]] = obj
    return res


@app.route("/getCurrMap", methods=['POST'])
def get_curr_map():
    content = json.loads(request.data)
    session = request.cookies.get('session') if 'session' in request.cookies else str(uuid.uuid4())
    res = {"algoMapping": {}, "objMapping": {}, "objNames": Mapping.obj_names}
    included = set()
    if session in Mapping.obj_session_map:
        for key in Mapping.obj_session_map[session]:
            included.add(key)
            res = include_key(res, key)
    for key in Mapping.obj_map:
        if key not in included:
            res = include_key(res, key)
    response = jsonify(res)
    if not request.cookies.get('session'):
        response.set_cookie('session', session)
    return response


@app.route("/representation", methods=['POST'])
def represent():
    content = json.loads(request.data)
    session = request.cookies.get('session') if 'session' in request.cookies else str(uuid.uuid4())
    obj = Mapping.obj_map[content["obj"]]
    variant = content["variant"]
    kwargs = content["kwargs"]
    res = mapping.get_repr(obj, variant, kwargs)
    response = jsonify(res)
    if not request.cookies.get('session'):
        response.set_cookie('session', session)
    return response


@app.route('/execute', methods=['POST'])
def execute_service():
    content = json.loads(request.data)
    session = request.cookies.get('session') if 'session' in request.cookies else str(uuid.uuid4())
    method = content["method"]
    suggested_type = content["suggested_type"]
    args = content["args"]
    kwargs_id = content["kwargs"]
    kwargs = {x.split("==")[0]: x.split("==")[1] for x in kwargs_id}
    obtained_from = []
    for i in range(len(args)):
        obtained_from.append(args[i])
        args[i] = mapping.get_arg(session, args[i])
    for x in kwargs.keys():
        obtained_from.append(kwargs[x])
        kwargs[x] = mapping.get_arg(session, kwargs[x])
    method = eval(method)
    args = tuple(args)
    kwargs = dict(kwargs)
    res = execute.execute(method, args, kwargs, obtained_from=obtained_from, session=session, suggested_type=suggested_type)
    response = jsonify(res)
    if not request.cookies.get('session'):
        response.set_cookie('session', session)
    return response
