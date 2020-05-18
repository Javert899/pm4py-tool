from pm4pytool.mapping import Mapping
from pm4py.objects.petri.exporter.pnml import export_petri_as_string
from pm4py.visualization.petrinet import visualizer as pn_visualizer
from pm4py.objects.petri.petrinet import PetriNet
from copy import copy
from tempfile import NamedTemporaryFile
import base64


def pnml(net_im_fm, kwargs0):
    kwargs = copy(kwargs0)
    kwargs["final_marking"] = net_im_fm[2]
    stru = export_petri_as_string(net_im_fm[0], net_im_fm[1], **kwargs)
    return stru

def svg(net_im_fm, kwargs0):
    kwargs = copy(kwargs0)
    gviz = pn_visualizer.apply(net_im_fm[0], net_im_fm[1], net_im_fm[2], parameters={"format": "svg"})
    temp_file = NamedTemporaryFile(suffix=".svg")
    temp_file.close()
    pn_visualizer.save(gviz, temp_file.name)
    F = open(temp_file.name, "r")
    content = F.read()
    F.close()
    return content


if not PetriNet in Mapping.representation:
    Mapping.representation[PetriNet] = {}
Mapping.representation[PetriNet]["pnml"] = pnml
Mapping.representation[PetriNet]["svg"] = svg

