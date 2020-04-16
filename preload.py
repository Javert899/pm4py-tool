import pm4py
from pm4pytool.mapping import Mapping
from pm4pytool import execute


def preload():
    log = execute.execute(eval("pm4py.objects.log.importer.xes.factory.apply"), ["C:/running-example.xes"], {}, preloaded=True)["algoResult"][0]
    Mapping.obj_names["running-example-log"] = log
