let ObjectsViewViewer = {
    template: "<div><div v-for='value in intAlgoMapping'><b>ID:</b> {{value[0]}}<br /><b>Name:</b> {{value[1]['repr']}}<br /><b>Type:</b> {{value[1]['type']}}<br /><b>Creation Date:</b> {{value[1]['creationTimestamp']}}<br /><br /><br /></div></div>",
    data: function() {
        return {
            name: '',
            intAlgoMapping: {}
        }
    },
    methods: {
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
        return function() {
            return {
                name: name,
                intAlgoMapping: algoMapping
            }
        }
    }
    objectsView.data = updateFunction();
}