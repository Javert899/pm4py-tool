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

    },
    methods: {

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
