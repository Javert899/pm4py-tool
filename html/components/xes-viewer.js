let XesViewer = {
    template: "<div>{{ xesString }}</div>",
    data: function() {
        return {
            name: '',
            log: null,
            xesString: ''
        }
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
    let comp = App.childrenMap[name];
    let updateFunction = function(log) {
        return function() {
            return {
                name: name,
                log: log,
                xesString: Repr(log, "xes")
            }
        }
    }
    log[1]["depending"].push([xesViewer, updateFunction]);
    xesViewer.data = updateFunction(log);
}
