from pm4pytool.mapping import Mapping
from pm4py.objects.petri.petrinet import PetriNet


def f(net_im_fm):
    if type(net_im_fm) is tuple or type(net_im_fm) is list:
        return "Accepting Petri net: " + str(net_im_fm[0].name)
    return "Petri net: " + str(net_im_fm.name)


Mapping.obj_synthesis[PetriNet] = f
