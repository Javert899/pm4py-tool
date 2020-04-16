import time


class Mapping:
    algo_synthesis = {}
    obj_synthesis = {}
    representation = {}
    obj_map = {}
    obj_session_map = {}
    obj_dict = {}
    obj_names = {}


def get_repr(obj, variant, kwargs):
    obj_type = type(obj) if obj is not str else obj
    if obj_type in Mapping.representation and variant in Mapping.representation[obj_type]:
        return {"repr": Mapping.representation[obj_type][variant](obj, kwargs)}
    return {"repr": ""}


def synth_obj(obj, master_id, obtained_from, preloaded=False):
    obj_type = type(obj) if obj is not str else obj
    ret = {"repr": repr(obj), "type": str(obj_type), "masterId": master_id, "childs": None,
           "creationTimestamp": time.time(), "preloaded": preloaded, "shared": False, "obtainedFrom": obtained_from,
           "inttype": "obj"}
    if obj_type in Mapping.obj_synthesis:
        ret["repr"] = Mapping.obj_synthesis[type(obj)](obj)
    return ret


def synth_algo(algo, after_exec, childs, obtained_from, typ=None, rep=None, preloaded=False, suggested_type=""):
    if typ is None:
        if algo in Mapping.algo_synthesis:
            typ, rep = Mapping.algo_synthesis[algo](after_exec)
        else:
            typ, rep = suggested_type, "Object: " + str(id(after_exec))
    ret = {"type": typ, "repr": rep, "master_id": None, "childs": childs, "creationTimestamp": time.time(),
           "preloaded": preloaded, "shared": False, "obtainedFrom": obtained_from, "inttype": "algo"}
    return ret


def get_arg(session, id):
    if session in Mapping.obj_session_map and id in Mapping.obj_session_map[session]:
        return Mapping.obj_session_map[session][id]
    elif id in Mapping.obj_map:
        if Mapping.obj_dict[id][1]["preloaded"] or Mapping.obj_dict[id][1]["shared"]:
            return Mapping.obj_map[id]
        raise Exception("SecurityCheckFailed")
    return id


def get_obj_from_name(name):
    if name in Mapping.obj_names:
        return Mapping.obj_dict[Mapping.obj_names[name]]
    return None
