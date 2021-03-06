let VariantsPercentageFilter = {
    template: "<div><input id='percentageFilteringVariantsComponent' type='text'></input><button v-on:click='updateLog()'>Apply Filter</button></div>",
    data: function() {
        return {
            name: '',
            originalLog: null
        }
    },
    created() {

    },
    methods: {
        updateLog() {
            let percentage = parseFloat(document.getElementById('percentageFilteringVariantsComponent').value);
            console.log("percentage");
            console.log(percentage);
            Execute("pm4py.algo.filtering.log.variants.variants_filter.filter_log_variants_percentage", [this.originalLog], {"percentage": percentage}, "", true, this.originalLog);
            console.log("applied");
        }
    }
}

function InitializeVariantsPercentageFilter(log, name="defaultXesHtmlViewer", target_comp=null) {
    let variantsPercentageFilter = Object.assign({}, VariantsPercentageFilter);
    let updateFunction = function(log) {
        App.$emit("update", [name, name, log]);
        return function() {
            return {
                name: name,
                originalLog: log,
            }
        }
    }
    variantsPercentageFilter.data = updateFunction(log);
    if (target_comp == null) {
        App.addChildren(name, variantsPercentageFilter);
    }
    else {
        App.$emit("addComponentByName", [target_comp, name, variantsPercentageFilter]);
    }
}