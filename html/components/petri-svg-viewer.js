let PetriSvgViewer = {
    template: "<div v-html='svgString'></div>",
    data: function() {
        return {
            name: '',
            netImFm: null,
            svgString: ''
        }
    },
    created() {
        App.$on("update", val => {
            if (val[0] == null || val[0] == this.name) {
                this.performUpdate(val[1], val[2], val[3]);
            }
        });
    },
    methods: {
        performUpdate(name, netImFm, svgString) {
            this.name = name;
            this.netImFm = netImFm;
            this.svgString = svgString;
            this.$forceUpdate();
        }
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
    let updateFunction = function(netImFm) {
        let svgReprString = Repr(netImFm, "svg");
        App.$emit("update", [name, name, netImFm, svgReprString]);
        return function() {
            return {
                name: name,
                netImFm: netImFm,
                svgString: svgReprString
            }
        }
    }
    netImFm[1]["depending"].push([svgViewer, updateFunction]);
    svgViewer.data = updateFunction(netImFm);
}
