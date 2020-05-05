let XesViewer = {
    template: "<div>{{ xesString }}</div>",
    data: function() {
        return {
            name: '',
            xesString: ''
        }
    },
    methods: {
    }
}

function InitializeXesViewer(log_repr, name="") {
    let xesViewer = Object.assign({}, XesViewer);
    App.addChildren(name, xesViewer);
    let comp = App.childrenMap[name];
    comp.data = function() {
        return {
            name: name,
            xesString: log_repr
        }
    }
}
