class Mapping:
    algo_synthesis = {}
    obj_synthesis = {}
    representation = {}
    obj_map = {}


def synth_obj(obj):
    if type(obj) in Mapping.obj_synthesis:
        return Mapping.obj_synthesis[type(obj)](obj)
    return repr(obj)
