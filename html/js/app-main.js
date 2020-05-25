const ServiceUrl = "http://localhost:5000";

let objMapping = {};
let algoMapping = {};
let objNames = {};

let tabsMap = {};
let childsCompMap = {};

let Tab = {
    template: '<div v-if="isActive">{{name}}<br /><template v-for="(child, index) in children"><component :is="child" :key="child.name"></component></template></div>',
    data: function() {
        return {
            name: "pippo",
            isActive: false,
            children: []
        }
    },
    created() {
        App.$on("render", val => {
            if (val == null || val == this.name) {
                this.reRender();
            }
        });
        App.$on("changeActive", val => {
            this.changeActive(val);
        });
        App.$on("addComponentByName", val => {
            this.addComponentByName(val[0], val[1], val[2]);
        })
    },
    methods: {
        reRender() {
            this.$forceUpdate();
        },
        changeActive(val) {
            if (this.name == val) {
                this.isActive = true;
            }
            else {
                this.isActive = false;
            }
        },
        addComp(name, comp) {
            this.children.push(comp);
            childsCompMap[name] = comp;
        },
        addComponentByName(target_name, comp_name, comp) {
            if (target_name == this.name) {
                this.addComp(comp_name, comp);
            }
        }
    }
};

let Tabs = {
    template: '<div><div class="tabs"><ul><li v-for="tab in tabs"><a v-on:click="selectTab(tab)" href="#">{{tab.data().name}}</a></li></ul></div><template v-for="(child, index) in tabs"><component :is="child" :key="child.name"></component></template></div>',

    data: function() {
        return {
            tabs: []
        };
    },
    created() {
        App.$on('addTabToTabs', val => {
          this.addTab(val[0], val[1]);
        });
        App.$on("render", val => {
            if (val == null || val == this.name) {
                this.reRender();
            }
        })
        App.$on("addComponentByName", val => {
            this.addComponentByName(val[0], val[1], val[2]);
        })
    },
    methods: {
        reRender() {
            this.$forceUpdate();
        },
        selectTab(selectedTab) {
            let selectedTabDataName = selectedTab.data().name;
            App.$emit('changeActive', selectedTabDataName);
        },
        addTab(name, comp) {
            this.tabs.push(comp);
            tabsMap[name] = comp;
        },
        addComponentByName(target_name, comp_name, comp) {
            if (target_name == this.name) {
                this.addTab(comp_name, comp);
            }
        }
    }
};

const App = new Vue({
  el: '#app',
  data: {
    name: 'mainAppComponent',
    children: [
    ],
    childrenMap: {
    }
  },
    created() {
    },
  methods: {
    addChildren (name, comp) {
      this.children.push(comp);
      this.childrenMap[name] = comp;
    },
    addComponentByName(target_name, comp_name, comp) {
        if (target_name == this.name) {
            this.addChildren(comp_name, comp);
        }
    }
  }
});

App.addChildren("tabs", Tabs);

function AddTab(name, active=false) {
    let tab = Object.assign({}, Tab);
    tab.data = function() {
        return {
            isActive: active,
            name: name,
            children: []
        };
    }
    App.$emit('addTabToTabs', [name, tab]);
    return tab;
}

function GetOneObjectForType(type) {
    for (let key in algoMapping) {
        if (algoMapping[key][1]["type"].includes(type)) {
            return algoMapping[key]
        }
    }
    for (let key in objMapping) {
        if (objMapping[key][1]["type"].includes(type)) {
            return objMapping[key];
        }
    }
    return null;
}

function GetObjectFromId(id) {
    for (let key in algoMapping) {
        if (key == id) {
            return algoMapping[key];
        }
    }
    for (let key in objMapping) {
        if (key == id) {
            return objMapping[id];
        }
    }
    return null;
}

function GetChilds(obj) {
    if (obj[1]["childs"] != null) {
        let childs = [];
        let i = 0;
        while (i < obj[1].childs.length) {
            childs.push(GetObjectFromId(obj[1].childs[i]));
            i++;
        }
        return childs;
    }
    return null;
}

function GetObjectFromName(name) {
    if (objNames[name] != null) {
        return GetObjectFromId(objNames[name]);
    }
    return null;
}

function GetParentObjectOfType(obj, type) {
    let i = 0;
    while (i < obj[1]["obtainedFrom"].length) {
        let rel_obj = GetObjectFromId(obj[1]["obtainedFrom"][i]);
        if (rel_obj[1]["type"].includes(type)) {
            return rel_obj;
        }
        i++;
    }
    return null;
}

function UpdateCallback(obj) {
    let i = 0;
    while (i < obj[1]["depending"].length) {
        obj[1]["depending"][i][0].data = obj[1]["depending"][i][1](obj);
        //App.$emit("render", obj[1]["depending"][i][0].data().name);
        i++;
    }
    i = 0;
    while (i < obj[1]["methodsAfterUpdate"].length) {
        obj[1]["methodsAfterUpdate"][i][0](obj);
        i++;
    }
    App.$emit('render', null);
}