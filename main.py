import pm4py
import pm4pytool
from pm4pytool import mapping
from pm4pytool.mapping import Mapping
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import uuid
import json

app = Flask(__name__, static_url_path='', static_folder="html")
app.add_url_rule(app.static_url_path + '/<path:filename>', endpoint='static',
                 view_func=app.send_static_file)
CORS(app)


def real_execute(method, args, kwargs, obtained_from=None, session=None):
    if session is not None:
        if session not in Mapping.obj_session_map:
            Mapping.obj_session_map[session] = {}
    if obtained_from is None:
        obtained_from = []
        for arg in args:
            if str(id(arg)) in Mapping.obj_map:
                obtained_from.append(str(id(arg)))
        for key, val in kwargs.items():
            if str(id(val)) in Mapping.obj_map:
                obtained_from.append(str(id(val)))
    after_exec = method(*args, **kwargs)
    res = {"objects": [], "algoResult": {}}
    master_id = str(id(after_exec))
    if type(after_exec) is tuple or type(after_exec) is list:
        childs = []
        for obj in after_exec:
            Mapping.obj_map[str(id(obj))] = obj
            if session is not None:
                Mapping.obj_session_map[session][str(id(obj))] = obj
            obj_syn = mapping.synth_obj(obj, master_id, obtained_from)
            Mapping.obj_dict[str(id(obj))] = [str(id(obj)), obj_syn]
            res["objects"].append(Mapping.obj_dict[str(id(obj))])
            childs.append(str(id(obj)))
        syn = mapping.synth_algo(method, after_exec, childs, obtained_from)
        Mapping.obj_dict[str(id(after_exec))] = [str(id(after_exec)), syn]
        res["algoResult"] = Mapping.obj_dict[str(id(after_exec))]
    else:
        obj_syn = mapping.synth_obj(after_exec, master_id, obtained_from)
        syn = mapping.synth_algo(method, after_exec, [], obtained_from, typ=str(type(after_exec)),
                                 rep=obj_syn["repr"])
        Mapping.obj_dict[str(id(after_exec))] = [str(id(after_exec)), syn]
        res["objects"].append(Mapping.obj_dict[str(id(after_exec))])
        res["algoResult"] = Mapping.obj_dict[str(id(after_exec))]
    Mapping.obj_map[str(id(after_exec))] = after_exec
    if session is not None:
        Mapping.obj_session_map[session][str(id(after_exec))] = after_exec
    return res


@app.route("/getCurrMap", methods=['POST'])
def get_curr_map():
    content = json.loads(request.data)
    session = request.cookies.get('session') if 'session' in request.cookies else str(uuid.uuid4())
    res = {"algoMapping": [], "objMapping": []}
    included = set()
    if session in Mapping.obj_session_map:
        for key in Mapping.obj_session_map[session]:
            included.add(key)
            obj = Mapping.obj_dict[key]
            if obj[1]["inttype"] == "algo":
                res["algoMapping"].append(obj)
            else:
                res["objMapping"].append(obj)
    for key in Mapping.obj_map:
        if key not in included:
            obj = Mapping.obj_dict[key]
            if obj[1]["inttype"] == "algo":
                res["algoMapping"].append(obj)
            else:
                res["objMapping"].append(obj)
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
def execute():
    content = json.loads(request.data)
    session = request.cookies.get('session') if 'session' in request.cookies else str(uuid.uuid4())
    method = content["method"]
    args = content["args"]
    kwargs_id = content["kwargs"]
    kwargs = {x.split("==")[0]: x.split("==")[1] for x in kwargs_id}
    obtained_from = []
    for i in range(len(args)):
        obtained_from.append(args[i])
        args[i] = pm4pytool.mapping.get_arg(session, args[i])
    for x in kwargs.keys():
        obtained_from.append(kwargs[x])
        kwargs[x] = pm4pytool.mapping.get_arg(session, kwargs[x])
    method = eval(method)
    args = tuple(args)
    kwargs = dict(kwargs)
    res = real_execute(method, args, kwargs, obtained_from=obtained_from, session=session)
    response = jsonify(res)
    if not request.cookies.get('session'):
        response.set_cookie('session', session)
    return response


if __name__ == "__main__":
    app.run()
