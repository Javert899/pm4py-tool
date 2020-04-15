class Mapping:
    algo_synthesis = {}
    obj_synthesis = {}
    representation = {}
    obj_map = {}
    obj_session_map = {}


def synth_obj(obj):
    if type(obj) in Mapping.obj_synthesis:
        return {"repr": Mapping.obj_synthesis[type(obj)](obj), "type": str(type(obj))}
    return {"repr": repr(obj), "type": str(type(obj))}


def synth_algo(algo, after_exec):
    if algo in Mapping.algo_synthesis:
        return Mapping.algo_synthesis[algo](after_exec)
    return "", "Object: "+str(id(after_exec))


def get_arg(session, id):
    if id in Mapping.obj_map:
        return Mapping.obj_map[id]
    elif session in Mapping.obj_session_map and id in Mapping.obj_session_map[session]:
        return Mapping.obj_session_map[session][id]
    return id
