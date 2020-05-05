from pm4pytool.mapping import Mapping
from pm4py.objects.petri.exporter.pnml import export_petri_as_string
from pm4py.objects.petri.petrinet import PetriNet
from copy import copy


def f(net_im_fm, kwargs0):
    kwargs = copy(kwargs0)
    kwargs["final_marking"] = net_im_fm[2]
    stru = export_petri_as_string(net_im_fm[0], net_im_fm[1], **kwargs)
    return stru


if not PetriNet in Mapping.representation:
    Mapping.representation[PetriNet] = {}
Mapping.representation[PetriNet]["pnml"] = f
