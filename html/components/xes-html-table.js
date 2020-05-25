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

function InitializeXesHtmlViewer(log, name="defaultXesHtmlViewer", target_comp=null) {
    let xesViewer = Object.assign({}, XesHtmlTable);
    if (target_comp == null) {
        App.addChildren(name, xesViewer);
    }
    else {
        App.$emit("addComponentByName", [target_comp, name, xesViewer]);
    }
    let updateFunction = function(log) {
        let xesStringRepr = Repr(log, "html_table");
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
