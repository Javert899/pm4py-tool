let XesViewer = {
    template: "<div>{{ xesString }}</div>",
    data: function() {
        return {
            name: '',
            log: null,
            xesString: ''
        }
    },
    created() {
        App.$on("update", val => {
            if (val[0] == null || val[0] == this.name) {
                this.performUpdate();
            }
        });
    },
    methods: {
        performUpdate() {
            this.$forceUpdate();
        }
    }
}

function InitializeXesViewer(log, name="defaultXesViewer", target_comp=null) {
    let xesViewer = Object.assign({}, XesViewer);
    if (target_comp == null) {
        App.addChildren(name, xesViewer);
    }
    else {
        App.$emit("addComponentByName", [target_comp, name, xesViewer]);
    }
    let updateFunction = function(log) {
        let xesStringRepr = Repr(log, "xes");
        App.$emit("update", [name, name, log, xesStringRepr]);
        return function() {
            return {
                name: name,
                log: log,
                xesString: xesStringRepr
            }
        }
    }
    log[1]["depending"].push([xesViewer, updateFunction]);
    xesViewer.data = updateFunction(log);
}
