let TracesCountViewer = {
    template: "<div><b>Number of traces:</b> {{tracesCount}}</div>",
    data: function() {
        return {
            name: '',
            tracesCount: 0
        }
    },
    created() {
        App.$on("update", val => {
            if (val[0] == null || val[0] == this.name) {
                this.performUpdate(val[1], val[2]);
            }
        });
    },
    methods: {
        performUpdate(name, tracesCount) {
            this.name = name;
            this.tracesCount = tracesCount;
            this.$forceUpdate();
        }
    }
}

function InitializeTracesCountViewer(log, name="defaultTracesCount", target_comp=null) {
    let tracesCountViewer =  Object.assign({}, TracesCountViewer);
    let updateFunction = function(log) {
        let trCount = Execute("len", [log], {});
        let trCountRepr = Repr(trCount, "");
        App.$emit("update", [name, name, trCountRepr]);
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
