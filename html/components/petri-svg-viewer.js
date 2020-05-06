let PetriSvgViewer = {
    template: "<div v-html='svgString'></div>",
    data: function() {
        return {
            name: '',
            netImFm: null,
            svgString: ''
        }
    },
    methods: {
    }
}

function InitializePetriSvgViewer(netImFm, name="defaultPetriSvgViewer") {
    let svgViewer = Object.assign({}, PetriSvgViewer);
    App.addChildren(name, svgViewer);
    let comp = App.childrenMap[name];
    let updateFunction = function(netImFm) {
        return function() {
            return {
                name: name,
                netImFm: netImFm,
                svgString: Repr(netImFm, "svg")
            }
        }
    }
    console.log(netImFm);
    netImFm[1]["depending"].push([svgViewer, updateFunction]);
    svgViewer.data = updateFunction(netImFm);
}
