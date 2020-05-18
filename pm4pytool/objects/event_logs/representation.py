from pm4py.objects.log.log import EventLog
from pm4pytool.mapping import Mapping
from pm4py.objects.log.exporter.xes.variants import etree_xes_exp


def f(log, kwargs):
    stru = etree_xes_exp.__export_log_as_string(log, **kwargs).decode("utf-8")
    return stru


if not EventLog in Mapping.representation:
    Mapping.representation[EventLog] = {}
Mapping.representation[EventLog]["xes"] = f
