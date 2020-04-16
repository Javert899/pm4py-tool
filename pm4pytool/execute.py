import pm4py
from pm4pytool import mapping
from pm4pytool.mapping import Mapping


def execute(method, args, kwargs, obtained_from=None, session=None, preloaded=False):
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
            obj_syn = mapping.synth_obj(obj, master_id, obtained_from, preloaded=preloaded)
            Mapping.obj_dict[str(id(obj))] = [str(id(obj)), obj_syn]
            res["objects"].append(Mapping.obj_dict[str(id(obj))])
            childs.append(str(id(obj)))
        syn = mapping.synth_algo(method, after_exec, childs, obtained_from, preloaded=preloaded)
        Mapping.obj_dict[str(id(after_exec))] = [str(id(after_exec)), syn]
        res["algoResult"] = Mapping.obj_dict[str(id(after_exec))]
    else:
        obj_syn = mapping.synth_obj(after_exec, master_id, obtained_from, preloaded=preloaded)
        syn = mapping.synth_algo(method, after_exec, [], obtained_from, typ=str(type(after_exec)),
                                 rep=obj_syn["repr"], preloaded=preloaded)
        Mapping.obj_dict[str(id(after_exec))] = [str(id(after_exec)), syn]
        res["objects"].append(Mapping.obj_dict[str(id(after_exec))])
        res["algoResult"] = Mapping.obj_dict[str(id(after_exec))]
    Mapping.obj_map[str(id(after_exec))] = after_exec
    if session is not None:
        Mapping.obj_session_map[session][str(id(after_exec))] = after_exec
    return res
