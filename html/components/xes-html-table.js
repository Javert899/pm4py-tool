let XesHtmlTable = {
    template: "<div v-html='xesString'></div>",
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

function InitializeXesHtmlViewer(log, name="defaultXesHtmlViewer", target_comp=null) {
    let xesViewer = Object.assign({}, XesHtmlTable);
    let updateFunction = function(log) {
        let xesStringRepr = Repr(log, "html_table");
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
    if (target_comp == null) {
        App.addChildren(name, xesViewer);
    }
    else {
        App.$emit("addComponentByName", [target_comp, name, xesViewer]);
    }
}
