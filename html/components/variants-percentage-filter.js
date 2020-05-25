let VariantsPercentageFilter = {
    template: "<div><button v-on:click='updateLog(0.6)'>Apply Filter</button></div>",
    data: function() {
        return {
            name: '',
            originalLog: null
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
        updateLog(percentage) {
            console.log("percentage");
            Execute("pm4py.algo.filtering.log.variants.variants_filter.filter_log_variants_percentage", [this.originalLog], {"percentage": percentage}, "", true, this.originalLog);
            console.log("applied");
        },
        performUpdate(name, originalLog) {
            this.name = name;
            this.originalLog = originalLog;
            this.$forceUpdate();
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