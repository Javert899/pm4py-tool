let VariantsPercentageFilter = {
    template: "<div><button v-on:click='updateLog(0.6)'>Apply Filter</button></div>",
    data: function() {
        return {
            name: '',
            originalLog: null
        }
    },
    methods: {
        updateLog(percentage) {
            console.log("percentage");
            Execute("pm4py.algo.filtering.log.variants.variants_filter.filter_log_variants_percentage", [this.originalLog], {"percentage": percentage}, "", true, this.originalLog);
            console.log("applied");
        }
    }
}

function InitializeVariantsPercentageFilter(log, name="defaultXesHtmlViewer", target_comp=null) {
    let variantsPercentageFilter = Object.assign({}, VariantsPercentageFilter);
    if (target_comp == null) {
        App.addChildren(name, variantsPercentageFilter);
    }
    else {
        App.$emit("addComponentByName", [target_comp, name, variantsPercentageFilter]);
    }
    let updateFunction = function(log) {
        return function() {
            return {
                name: name,
                originalLog: log,
            }
        }
    }
    variantsPercentageFilter.data = updateFunction(log);
}