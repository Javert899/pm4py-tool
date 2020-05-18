import pm4py
from pm4pytool.mapping import Mapping
from pm4pytool import execute


def preload():
    if False:
        log = execute.execute(eval("pm4py.objects.log.importer.xes.algorithm.apply"), ["C:/running-example.xes"], {}, preloaded=True)["algoResult"][0]
        Mapping.obj_names["running-example-log"] = log
        accepting_petri_net = execute.execute(eval("pm4py.algo.discovery.inductive.algorithm.apply"), [log], {}, preloaded=True, suggested_type="AcceptingPetriNet")["algoResult"][0]
        Mapping.obj_names["running-example-petri"] = accepting_petri_net
    pass