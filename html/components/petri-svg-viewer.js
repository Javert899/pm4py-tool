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

function InitializePetriSvgViewer(netImFm, name="defaultPetriSvgViewer", target_comp=null) {
    let svgViewer = Object.assign({}, PetriSvgViewer);
    if (target_comp == null) {
        App.addChildren(name, svgViewer);
    }
    else {
        App.$emit("addComponentByName", [target_comp, name, svgViewer]);
    }
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
    netImFm[1]["depending"].push([svgViewer, updateFunction]);
    svgViewer.data = updateFunction(netImFm);
}
