from pm4py.objects.log.log import EventLog
from pm4pytool.mapping import Mapping
from pm4py.objects.log.exporter.xes.variants import etree_xes_exp
from pm4py.objects.conversion.log import converter
import tempfile


def export_xes_string(log, kwargs):
    stru = etree_xes_exp.__export_log_as_string(log, **kwargs).decode("utf-8")
    return stru


def export_xes_as_html(log, kwargs):
    df = converter.apply(log, variant=converter.TO_DATA_FRAME)
    tf = tempfile.NamedTemporaryFile(suffix="html")
    tf.close()
    df.to_html(tf.name)
    F = open(tf.name, "r")
    stru = F.read()
    F.close()
    return stru


if not EventLog in Mapping.representation:
    Mapping.representation[EventLog] = {}
Mapping.representation[EventLog]["xes"] = export_xes_string
Mapping.representation[EventLog]["html_table"] = export_xes_as_html
