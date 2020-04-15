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


def real_execute(method, args, kwargs):
    after_exec = method(*args, **kwargs)
    res = {"objects": [], "algoResult": {}}
    if type(after_exec) is tuple or type(after_exec) is list:
        for obj in after_exec:
            Mapping.obj_map[str(id(obj))] = after_exec
            obj_dict = {str(id(obj)): mapping.synth_obj(obj)}
            res["objects"].append(obj_dict)
        Mapping.obj_map[str(id(after_exec))] = after_exec
        syn = mapping.synth_algo(method, after_exec)
        res["algoResult"] = {str(id(after_exec)): {"type": syn[0], "repr": syn[1]}}
    else:
        Mapping.obj_map[str(id(after_exec))] = after_exec
        obj_dict = {str(id(after_exec)): mapping.synth_obj(after_exec)}
        res["objects"].append(obj_dict)
        res["algoResult"] = {str(id(after_exec)): {"type": str(type(after_exec)), "repr": mapping.synth_obj(after_exec)["repr"]}}
    return res


@app.route('/execute', methods=['POST'])
def execute():
    content = json.loads(request.data)
    session = request.cookies.get('session') if 'session' in request.cookies else str(uuid.uuid4())
    method = content["method"]
    args = content["args"]
    kwargs_id = content["kwargs"]
    kwargs = {x.split("==")[0]: x.split("==")[1] for x in kwargs_id}
    for i in range(len(args)):
        args[i] = pm4pytool.mapping.get_arg(session, args[i])
    for x in kwargs.keys():
        kwargs[x] = pm4pytool.mapping.get_arg(session, kwargs[x])
    method = eval(method)
    args = tuple(args)
    kwargs = dict(kwargs)
    res = real_execute(method, args, kwargs)
    response = jsonify(res)
    if not request.cookies.get('session'):
        response.set_cookie('session', session)
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0")

