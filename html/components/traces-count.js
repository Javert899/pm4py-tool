let TracesCountViewer = {
    template: "<div><b>Number of traces:</b> {{tracesCount}}</div>",
    data: function() {
        return {
            name: '',
            tracesCount: 0
        }
    },
    created() {

    },
    methods: {

    }
}

function InitializeTracesCountViewer(log, name="defaultTracesCount", target_comp=null) {
    let tracesCountViewer =  Object.assign({}, TracesCountViewer);
    let updateFunction = function(log) {
        let trCount = Execute("len", [log], {});
        let trCountRepr = Repr(trCount, "");
        return function() {
            return {
                name: name,
                tracesCount: trCountRepr
            }
         }
    }
    log[1]["depending"].push([tracesCountViewer, updateFunction]);
    tracesCountViewer.data = updateFunction(log);
    if (target_comp == null) {
        App.addChildren(name, tracesCountViewer);
    }
    else {
        App.$emit("addComponentByName", [target_comp, name, tracesCountViewer]);
    }
}
