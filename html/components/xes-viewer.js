let XesViewer = {
    template: "<div>{{ xesString }} <button v-on:click='XesViewerButtonClicked(name)'>ciao</button></div>",
    data: function() {
        return {
            name: '',
            xesString: ''
        }
    },
    methods: {
        XesViewerButtonClicked(name) {
            console.log(name);
        }
    }
}
