import pm4py
from pm4pytool.mapping import Mapping
from pm4pytool import execute


def preload():
    log = execute.execute(eval("pm4py.objects.log.importer.xes.factory.apply"), ["C:/running-example.xes"], {}, preloaded=True)["algoResult"][0]
    Mapping.obj_names["running-example-log"] = log
    accepting_petri_net = execute.execute(eval("pm4py.algo.discovery.inductive.factory.apply"), [log], {}, preloaded=True, suggested_type="AcceptingPetriNet")["algoResult"][0]
    Mapping.obj_names["running-example-petri"] = accepting_petri_net
