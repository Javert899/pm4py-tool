let ObjectsViewViewer = {
    template: "<div><div v-for='value in intAlgoMapping'><b>ID:</b> {{value[0]}}<br /><b>Name:</b> {{value[1]['repr']}}<br /><b>Type:</b> {{value[1]['type']}}<br /><b>Creation Date:</b> {{value[1]['creationTimestamp']}}<br /><br /><br /></div></div>",
    data: function() {
        return {
            name: '',
            intAlgoMapping: {}
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
        performUpdate(name, algoMapping) {
            this.name = name;
            this.algoMapping = algoMapping;
            this.$forceUpdate();
        }
    }
}

function InitializeObjectsView(name="defaultObjectsView", target_comp=null) {
    let objectsView =  Object.assign({}, ObjectsViewViewer);
    if (target_comp == null) {
        App.addChildren(name, objectsView);
    }
    else {
        App.$emit("addComponentByName", [target_comp, name, objectsView]);
    }
    let updateFunction = function() {
        App.$emit("update", [name, name, algoMapping]);
        return function() {
            return {
                name: name,
                intAlgoMapping: algoMapping
            }
        }
    }
    objectsView.data = updateFunction();
}