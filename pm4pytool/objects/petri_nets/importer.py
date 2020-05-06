from pm4pytool.mapping import Mapping

Mapping.importers[".pnml"] = ("pm4py.objects.petri.importer.versions.pnml.import_net", {})
