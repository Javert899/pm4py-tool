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

function InitializeXesViewer(log, name="") {
    let xesViewer = Object.assign({}, XesViewer);
    App.addChildren(name, xesViewer);
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
    console.log(log);
    log[1]["depending"].push([xesViewer, updateFunction]);
    xesViewer.data = updateFunction(log);
}
