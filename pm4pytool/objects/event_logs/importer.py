from pm4pytool.mapping import Mapping

Mapping.importers[".xes"] = ("pm4py.objects.log.importer.xes.factory.apply", {}, "EventLog")

