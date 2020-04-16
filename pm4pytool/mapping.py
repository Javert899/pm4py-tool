import time


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


def synth_obj(obj, master_id, obtained_from):
    ret = {"repr": repr(obj), "type": str(type(obj)), "masterId": master_id, "childs": None,
           "creationTimestamp": time.time(), "preloaded": False, "obtainedFrom": obtained_from}
    if type(obj) in Mapping.obj_synthesis:
        ret["repr"] = Mapping.obj_synthesis[type(obj)](obj)
    return ret


def synth_algo(algo, after_exec, childs, obtained_from, typ=None, rep=None):
    if typ is None:
        if algo in Mapping.algo_synthesis:
            typ, rep = Mapping.algo_synthesis[algo](after_exec)
        else:
            typ, rep = "", "Object: " + str(id(after_exec))
    ret = {"type": typ, "repr": rep, "master_id": None, "childs": childs, "creationTimestamp": time.time(),
           "preloaded": False, "obtainedFrom": obtained_from}
    return ret


def get_arg(session, id):
    if id in Mapping.obj_map:
        return Mapping.obj_map[id]
    elif session in Mapping.obj_session_map and id in Mapping.obj_session_map[session]:
        return Mapping.obj_session_map[session][id]
    return id
