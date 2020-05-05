from pm4py.objects.log.log import EventLog
from pm4pytool.mapping import Mapping
from pm4py.objects.log.exporter.xes import factory as xes_exporter


def f(log, kwargs):
    stru = xes_exporter.export_log_as_string(log, **kwargs).decode("utf-8")
    return stru


if not EventLog in Mapping.representation:
    Mapping.representation[EventLog] = {}
Mapping.representation[EventLog]["xes"] = f
