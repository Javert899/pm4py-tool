from pm4py.objects.log.log import EventLog
from pm4pytool.mapping import Mapping


def f(log):
    log_name = log.attributes["name"] if "name" in log.attributes else ""
    return "Log: "+log_name


Mapping.obj_synthesis[EventLog] = f
