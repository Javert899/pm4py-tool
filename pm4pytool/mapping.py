class Mapping:
    algo_synthesis = {}
    obj_synthesis = {}
    representation = {}
    obj_map = {}
    obj_session_map = {}


def get_repr(obj, variant, kwargs):
    if type(obj) in Mapping.representation and variant in Mapping.representation[type(obj)]:
        return {"repr": Mapping.representation[type(obj)][variant](obj, kwargs)}
    return {"repr": ""}


def synth_obj(obj, master_id):
    if type(obj) in Mapping.obj_synthesis:
        return {"repr": Mapping.obj_synthesis[type(obj)](obj), "type": str(type(obj)), "masterId": master_id,
                "childs": None}
    return {"repr": repr(obj), "type": str(type(obj)), "masterId": master_id, "childs": None}


def synth_algo(algo, after_exec):
    if algo in Mapping.algo_synthesis:
        return Mapping.algo_synthesis[algo](after_exec)
    return "", "Object: " + str(id(after_exec))


def get_arg(session, id):
    if id in Mapping.obj_map:
        return Mapping.obj_map[id]
    elif session in Mapping.obj_session_map and id in Mapping.obj_session_map[session]:
        return Mapping.obj_session_map[session][id]
    return id
