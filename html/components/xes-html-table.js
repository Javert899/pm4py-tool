let XesHtmlTable = {
    template: "<div v-html='xesString'></div>",
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

function InitializeXesHtmlViewer(log, name="defaultXesHtmlViewer", target_comp=null) {
    let xesViewer = Object.assign({}, XesHtmlTable);
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
                xesString: Repr(log, "html_table")
            }
        }
    }
    log[1]["depending"].push([xesViewer, updateFunction]);
    xesViewer.data = updateFunction(log);
}
