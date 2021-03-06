//let log = Execute("pm4py.objects.log.importer.xes.importer.apply", ["C:/running-example.xes"], {});
let log = GetObjectFromName("running-example-log");
//let log = GetOneObjectForType("pm4py.objects.log.log.EventLog");
//let acceptingPetriNet = GetObjectFromName("running-example-petri");
let acceptingPetriNet = Execute("pm4py.algo.discovery.inductive.algorithm.apply", [log], {}, suggestedType="AcceptingPetriNet");
log = GetParentObjectOfType(acceptingPetriNet, "pm4py.objects.log.log.EventLog");
console.log(log);
console.log(acceptingPetriNet);
let netImFm = GetChilds(acceptingPetriNet);
console.log(netImFm);
let net = netImFm[0];
let im = netImFm[1];
let fm = netImFm[2];
//fm = GetObjectFromId(fm[0]);
console.log(net);
let aligned_traces = Execute("pm4py.algo.conformance.alignments.algorithm.apply", [log, net, im, fm], {});
console.log(aligned_traces);
let log_repr = Repr(log, "xes");
//console.log(log_repr);

let xesViewer = Object.assign({}, XesViewer);
App.addChildren("xesViewer", xesViewer);
let comp = App.childrenMap["xesViewer"];
comp.data = function() {
    return {
        name: "xesViewer",
        xesString: log_repr
    }
}